
package com.bluetoothappnative

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

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

import java.io.IOException
import java.util.UUID
import android.util.Log

val BTLISTENER: String = "BTLISTENER";

typealias AcceptCallback = (result: BluetoothSocket?, error: String?, nativeCallback: Callback) -> Unit

class ServerThread(
      val NAME: String, 
      val _UUID: String, 
      val bluetoothAdapter: BluetoothAdapter?, 
      val acceptCallback: AcceptCallback, 
      val nativeCallback: Callback,
      // val timeoutCallBack: Callback
  ) : Thread() {

  // private val mmServerSocket: BluetoothServerSocket? by lazy(LazyThreadSafetyMode.NONE) {
  //     bluetoothAdapter?.listenUsingInsecureRfcommWithServiceRecord(NAME, UUID.fromString(_UUID))
  // }

  private var mmServerSocket: BluetoothServerSocket? = null

  init {
    try {
      mmServerSocket = bluetoothAdapter?.listenUsingInsecureRfcommWithServiceRecord(NAME, UUID.fromString(_UUID))
    } catch (e: IOException) {
      Log.e(BTLISTENER, "Server failed to load", e)
    }
  }

  override fun run() {

    if (mmServerSocket == null) {
      return
    }

    var shouldLoop = true
    while (shouldLoop) {

      val socket: BluetoothSocket? = try {
        mmServerSocket?.accept()

      } catch (e: IOException) {
        val error: String = "Socket's accept() method failed"
        Log.e(BTLISTENER, error)
        acceptCallback(null, error, nativeCallback)

        shouldLoop = false
        null
      }

      socket?.also {
        acceptCallback(it, null, nativeCallback)
        // manageMyConnectedSocket(it)
        mmServerSocket?.close()
        shouldLoop = false
      }
    }
  }

  // Closes the connect socket and causes the thread to finish.
  public fun cancel() {
    try {
      mmServerSocket?.close()

    } catch (e: IOException) {
      Log.e(BTLISTENER, "Could not close the connect socket")
    }
  }

}

class ClientThread(
      val device: BluetoothDevice, 
      val _UUID: String, 
      val bluetoothAdapter: BluetoothAdapter?, 
      val acceptCallback: AcceptCallback, 
      val nativeCallback: Callback,
      // val timeoutCallBack: Callback
  ) : Thread() {

  private var btSocket: BluetoothSocket? = null

  init {
    try {
      btSocket = device.createRfcommSocketToServiceRecord(UUID.fromString(_UUID))
        
    } catch (e: IOException) {
      Log.e(BTLISTENER, "Client failed to create a connection", e)
    }
  }

  override fun run() {
    try {
      Log.d(BTLISTENER, "Started Client run")
      // Cancel discovery because it otherwise slows down the connection.
      bluetoothAdapter?.cancelDiscovery()

      btSocket?.let { socket ->
        // until it succeeds or throws an exception.
        Log.d(BTLISTENER, "Waiting to connect")
        socket.connect()

        acceptCallback(socket, null, nativeCallback)
      }
    } catch (e: IOException) {
      acceptCallback(null, e.message ?: "", nativeCallback)
      Log.e(BTLISTENER, e.message ?: "")
      cancel()

      null
    }
  }

  // Closes the client socket and causes the thread to finish.
  public fun cancel() {
    try {
      btSocket?.close()

    } catch (e: IOException) {
      Log.e(BTLISTENER, "Could not close the client socket", e)
    }
  }
}

