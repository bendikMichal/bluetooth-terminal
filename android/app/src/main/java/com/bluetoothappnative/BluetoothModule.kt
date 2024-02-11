package com.bluetoothappnative

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

import androidx.annotation.NonNull

class BluetoothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  @NonNull
  override fun getName(): String { return "BluetoothLiteModule" }

  @ReactMethod
  fun initBluetooth (callback: Callback ) {
    callback.invoke("Initialized bluetooth (fake)");
  }
}