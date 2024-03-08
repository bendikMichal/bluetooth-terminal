package com.bluetoothappnative

import android.Manifest
import android.content.pm.PackageManager

// bridging
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

import com.facebook.react.modules.core.DeviceEventManagerModule

// arrays
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableNativeArray

// map
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap

// bt stuff
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothManager
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothSocket
import android.bluetooth.BluetoothServerSocket

// android stuff
import android.content.Context
import android.content.Intent
import android.app.Activity
import android.os.Handler

import androidx.annotation.NonNull
import android.util.Log
import android.util.Base64

import java.io.IOException
import java.nio.charset.StandardCharsets


class BluetoothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  val context = reactContext

  val REQUEST_ENABLE_BT = 1
  val REQUEST_CODE_BLUETOOTH_PERMISSION = 2

  private var bluetoothAdapter: BluetoothAdapter? = null
  private var btSocket: BluetoothSocket? = null
  private var btIO: BtIO? = null

  lateinit var serverThread: ServerThread
  lateinit var clientThread: ClientThread


  @NonNull
  override fun getName(): String { return "BluetoothLiteModule" }

  @ReactMethod
  fun initBluetooth (callback: Callback) {
    val bluetoothManager: BluetoothManager = context.getSystemService(BluetoothManager::class.java)

    bluetoothAdapter = bluetoothManager.getAdapter()

    // check if supports bt
    if (bluetoothAdapter == null) {
      callback.invoke(false);
      return
    }

    val currentActivity = context.currentActivity

    // request bt permissions if hadn't already
    if (currentActivity?.checkSelfPermission(Manifest.permission.BLUETOOTH_CONNECT)
        != PackageManager.PERMISSION_GRANTED) {
      // Request Bluetooth permission
      currentActivity?.requestPermissions(
          arrayOf(Manifest.permission.BLUETOOTH_CONNECT),
          REQUEST_CODE_BLUETOOTH_PERMISSION
      )
    }

    if (currentActivity?.checkSelfPermission(Manifest.permission.BLUETOOTH_SCAN)
        != PackageManager.PERMISSION_GRANTED) {
      // Request Bluetooth permission
      currentActivity?.requestPermissions(
          arrayOf(Manifest.permission.BLUETOOTH_SCAN),
          REQUEST_CODE_BLUETOOTH_PERMISSION
      )
    }

    // request to enable bt
    if (bluetoothAdapter?.isEnabled == false) {
      val enableBtIntent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
      currentActivity?.startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT)
    }


    callback.invoke(true);
  }
  
  fun getPaired (): Set<BluetoothDevice>? {
    if (bluetoothAdapter == null) return null 
    if (bluetoothAdapter?.isEnabled == false) return null

    return bluetoothAdapter?.bondedDevices
  }

  fun getDeviceFromAddress (address: String): BluetoothDevice? {
    val pairedDevices: Set<BluetoothDevice>? = getPaired()
    if (pairedDevices == null) return null

    var device: BluetoothDevice? = null
    for (pd in pairedDevices) {
      if (pd.address == address) {
        device = pd
        break
      }
    }

    return device
  }

  @ReactMethod 
  fun listPaired (callback: Callback) {
    val pairedDevices: Set<BluetoothDevice>? = getPaired()
    if (pairedDevices == null) { return }

    val resJsArray: WritableArray = WritableNativeArray()

    for (device in pairedDevices) {
      val map: WritableMap = WritableNativeMap();
      map.putString("name", device.name)
      map.putString("address", device.address)
      map.putString("uuid", getFirstUUIDFromDevice(device))
      resJsArray.pushMap(map)
    }

    callback(resJsArray)
  }

  fun getFirstUUIDFromDevice (dev: BluetoothDevice): String {
    if (dev.uuids != null && dev.uuids.isNotEmpty()) {
      return dev.uuids[0].uuid.toString()
    }

    return ""
  }

  @ReactMethod
  fun startServer (NAME: String, _UUID: String, timeout: Int, callback: Callback) {
    if (bluetoothAdapter == null || (::serverThread.isInitialized && serverThread.state != Thread.State.TERMINATED) || btSocket != null) { return }
    if (bluetoothAdapter?.isEnabled == false) { return }
    
    Log.d(BTLISTENER, "Start server")

    serverThread = ServerThread(NAME, _UUID, bluetoothAdapter, this::onConnectCallback, callback)
    serverThread.start()

    if (timeout > 0) {
      var handler = Handler()
      handler.postDelayed({
        if (serverThread.state != Thread.State.TERMINATED) {
          Log.e(BTLISTENER, "Timeout error.")
          onConnectCallback(null, "Timeout error.", callback)

          serverThread.interrupt()
        } else {
          Log.d(BTLISTENER, "success?")
        }

      }, timeout.toLong());
    }
  }

  @ReactMethod
  fun stopServer () {
    if (btSocket == null) return

    try {
      btSocket?.close()
      btSocket = null

    } catch (e: IOException) {
      Log.e(BTLISTENER, "Could not close the connect socket")
    }
  }


  @ReactMethod
  fun startClient (address: String, _UUID: String, callback: Callback) {

    if (::clientThread.isInitialized) {
      Log.d(BTLISTENER, "${clientThread.state != Thread.State.TERMINATED}, ${btSocket != null}")
    }

    if ((::clientThread.isInitialized && clientThread.state != Thread.State.TERMINATED) || btSocket != null) return
    try {
      Log.d(BTLISTENER, "Start Client")


      var device: BluetoothDevice? = getDeviceFromAddress(address)

      if (device == null) {
        Log.e(BTLISTENER, "Failed to find device")
        return
      }
      // onConnectCallback(null, "teststst", callback)

      clientThread = ClientThread(
                        device, 
                        // getFirstUUIDFromDevice(device),
                        _UUID,
                        bluetoothAdapter,
                        this::onConnectCallback, 
                        callback, 
                      )

      clientThread.start()

    } catch (e: Exception) {
      Log.e(BTLISTENER, "welp", e)
    }
  }

  @ReactMethod
  fun stopClient () {
    stopServer()

    if (::clientThread.isInitialized) {
      if (clientThread.state != Thread.State.TERMINATED) {
        clientThread.interrupt()
      }
    }
  }
  
  @ReactMethod
  // fun btio (initNativeCallback: Callback, readNativeCallback: Callback, writeErrorNativeCallback: Callback) {
  fun btio () {
    Log.d(BTIO, "B4 thread start")
    if (btSocket == null) return



    // btIO = BtIO(btSocket!!, 
    //             // initNativeCallback, readNativeCallback, writeErrorNativeCallback,
    //             { initNativeCallback() },
    //             { res -> readNativeCallback() },
    //             { writeErrorNativeCallback() }
    //             );

    btIO = BtIO(btSocket!!, 
                { emitEvent("InitCallbackEvent", "") },
                { res -> emitEvent("ReadCallbackEvent", res) },
                { emitEvent("WriteErrorCallbackEvent", "") },
                { emitEvent("DisconnectEvent", "") }
                );

    btIO?.start()

  }
  
  @ReactMethod
  fun write (text: String) {
    if (btIO == null) return
    val buffer: ByteArray = text.toByteArray(StandardCharsets.UTF_8)
    btIO?.write(buffer)
  }

  fun onConnectCallback (result: BluetoothSocket?, error: String?, nativeCallback: Callback) {
    val resMap: WritableMap = WritableNativeMap()
    val connectSuccess: Boolean = result != null
    if (connectSuccess && result != null) {
      btSocket = result;
    }

    resMap.putBoolean("success", connectSuccess)
    resMap.putString("error", error ?: "")
    Log.d(BTIO, "B4 return callback")
    return nativeCallback(resMap);

  }

  fun emitEvent(name: String, message: String) {
    reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(name, message)
  }

}
