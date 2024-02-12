
@echo Please connect your device via usb cable
@echo Please enable usb debugging and install via usb

@echo =======================REQUIREMENTS=======================
@echo "ANDROID_HOME -> android sdk"
@echo Found ANDROID_HOME at %ANDROID_HOME%
@echo Found ANDROID_SDK (android sdk cli-tools) at %ANDROID_SDK%
@echo "javac, java -> openjdk, adoptium"
@echo gradle

@echo run prep.bat to install node deps

npm start
