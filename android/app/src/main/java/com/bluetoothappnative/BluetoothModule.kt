package com.bluetoothappnative

import android.Manifest
import android.content.pm.PackageManager

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

import androidx.annotation.NonNull

import android.bluetooth.BluetoothManager
import android.bluetooth.BluetoothAdapter

import android.content.Context
import android.content.Intent
import android.app.Activity



class BluetoothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  val context = reactContext

  val REQUEST_ENABLE_BT = 1
  val REQUEST_CODE_BLUETOOTH_PERMISSION = 2

  @NonNull
  override fun getName(): String { return "BluetoothLiteModule" }

  @ReactMethod
  fun initBluetooth (callback: Callback ) {
    val bluetoothManager: BluetoothManager = context.getSystemService(BluetoothManager::class.java)

    val bluetoothAdapter: BluetoothAdapter? = bluetoothManager.getAdapter()

    if (bluetoothAdapter == null) {
      callback.invoke(false);
      return
    }

    val currentActivity = context.currentActivity

    if (currentActivity?.checkSelfPermission(Manifest.permission.BLUETOOTH_CONNECT)
        != PackageManager.PERMISSION_GRANTED) {
      // Request Bluetooth permission
      currentActivity?.requestPermissions(
          arrayOf(Manifest.permission.BLUETOOTH_CONNECT),
          REQUEST_CODE_BLUETOOTH_PERMISSION
      )
    }

    if (bluetoothAdapter?.isEnabled == false) {
      val enableBtIntent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
      currentActivity?.startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT)
    }


    callback.invoke(true);
  }
}
