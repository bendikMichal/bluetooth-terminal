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

import java.nio.charset.StandardCharsets


class BluetoothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  val context = reactContext

  val REQUEST_ENABLE_BT = 1
  val REQUEST_CODE_BLUETOOTH_PERMISSION = 2

  private var bluetoothAdapter: BluetoothAdapter? = null
  private var btSocket: BluetoothSocket? = null
  private var btIO: BtIO? = null

  private lateinit var acceptThread: AcceptThread

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

    // request to enable bt
    if (bluetoothAdapter?.isEnabled == false) {
      val enableBtIntent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
      currentActivity?.startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT)
    }


    callback.invoke(true);
  }

  @ReactMethod 
  fun listPaired (callback: Callback) {
    if (bluetoothAdapter == null) { return }
    if (bluetoothAdapter?.isEnabled == false) { return }

    val pairedDevices: Set<BluetoothDevice>? = bluetoothAdapter?.bondedDevices
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
  fun connect (NAME: String, _UUID: String, timeout: Int, callback: Callback, timeoutCallBack: Callback) {
    if (bluetoothAdapter == null) { return }
    if (bluetoothAdapter?.isEnabled == false) { return }
    
    Log.d(BTLISTENER, "connnect")

    val thread = AcceptThread(NAME, _UUID, bluetoothAdapter, this::onConnectCallback, callback, timeoutCallBack)
    thread.start()

    var handler = Handler()
    handler.postDelayed({
      if (thread.state != Thread.State.TERMINATED) {
        Log.e(BTLISTENER, "Timeout error.")
        timeoutCallBack()
        thread.interrupt()
      } else {
        Log.d(BTLISTENER, "success?")
      }

    }, timeout.toLong());
  }
  
  @ReactMethod
  fun btio (readCallback: Callback, writeErrorCallback: Callback) {
    if (btSocket == null) return

    btIO = BtIO(btSocket!!, readCallback, writeErrorCallback);
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
    if (connectSuccess) {
      btSocket = result;
    }

    resMap.putBoolean("success", connectSuccess)
    resMap.putString("error", error ?: "")
    nativeCallback(resMap);

    // acceptThread?.close()
  }

}
