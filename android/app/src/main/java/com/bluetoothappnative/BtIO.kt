
package com.bluetoothappnative

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
import java.io.InputStream
import java.io.OutputStream
import java.util.UUID

import android.util.Log
import android.util.Base64

val BTIO: String = "BTIO"

class BtIO (
      val btSocket: BluetoothSocket,
      val initCallback: () -> Unit,
      val readCallback: (String) -> Unit, 
      val writeErrorCallback: () -> Unit
  ) : Thread() {

  val btin: InputStream = btSocket.inputStream
  val btout: OutputStream = btSocket.outputStream
  var buffer: ByteArray = ByteArray(1024)

  override fun run () {
    
    Log.d(BTIO, "Init btio")
    initCallback()
    
    while (true) {
      try {
        btin.read(buffer)

        // val res: String = Base64.encodeToString(buffer, Base64.DEFAULT)
        val res: String = String(buffer)
        readCallback(res)

      } catch (e: IOException) {
        Log.d(BTIO, "Input stream was disconnected", e)
        break
      }
    }
  }

  fun write(bytes: ByteArray) {
    try {
      btout.write(bytes)

    } catch (e: IOException) {
      Log.e(BTIO, "Error occurred when sending data", e)

      writeErrorCallback()
      return
    }
  }


  fun cancel() {
    try {
      btSocket.close()
      
    } catch (e: IOException) {
      Log.e(BTIO, "Could not close the connect socket", e)
    }
  }

}