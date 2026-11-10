
<image src=images/iPhone15-pro.png width=50% height=50% > </image>


```
sudo gem install xcodeproj
```

<details><summary>🪵 Log</summary>

```lua
Password:
Fetching CFPropertyList-3.0.8.gem
Fetching xcodeproj-1.28.1.gem
Fetching nanaimo-0.4.0.gem
Fetching claide-1.1.0.gem
Fetching colored2-3.1.2.gem
Fetching atomos-0.1.3.gem
Successfully installed nanaimo-0.4.0
Successfully installed colored2-3.1.2
Successfully installed claide-1.1.0
Successfully installed CFPropertyList-3.0.8
Successfully installed atomos-0.1.3
Successfully installed xcodeproj-1.28.1
Parsing documentation for nanaimo-0.4.0
Installing ri documentation for nanaimo-0.4.0
Parsing documentation for colored2-3.1.2
Installing ri documentation for colored2-3.1.2
Parsing documentation for claide-1.1.0
Installing ri documentation for claide-1.1.0
Parsing documentation for CFPropertyList-3.0.8
Installing ri documentation for CFPropertyList-3.0.8
Parsing documentation for atomos-0.1.3
Installing ri documentation for atomos-0.1.3
Parsing documentation for xcodeproj-1.28.1
Installing ri documentation for xcodeproj-1.28.1
Done installing documentation for nanaimo, colored2, claide, CFPropertyList, atomos, xcodeproj after 1 seconds
6 gems installed

A new release of RubyGems is available: 4.0.20 → 4.0.21!
See https://github.com/ruby/rubygems/blob/v4.0.21/CHANGELOG.md for the changes since 4.0.20.
Run `gem update --system 4.0.21` to update your installation.
```

</details>

```bash
gem update --system 4.0.21
```

<details><summary>🪵 Log</summary>

```lua
Ignoring ffi-1.16.3 because its extensions are not built. Try: gem pristine ffi --version 1.16.3
Updating rubygems-update
Fetching rubygems-update-4.0.21.gem
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory.
```

</details>

```bash
sudo gem install xcodeproj
```

<details><summary>🪵 Log</summary>

```lua
Successfully installed xcodeproj-1.28.1
Parsing documentation for xcodeproj-1.28.1
Done installing documentation for xcodeproj after 0 seconds
1 gem installed
```

</details>

```bash
sudo gem update --system 4.0.21
```
<details><summary>🪵 Log</summary>

```lua

Fetching rubygems-update-4.0.21.gem
Successfully installed rubygems-update-4.0.21
Parsing documentation for rubygems-update-4.0.21
Installing ri documentation for rubygems-update-4.0.21
Done installing documentation for rubygems-update after 0 seconds
Parsing documentation for rubygems-update-4.0.21
Done installing documentation for rubygems-update after 0 seconds
Installing RubyGems 4.0.21
  Successfully built RubyGem
  Name: bundler
  Version: 4.0.21
  File: bundler-4.0.21.gem
Bundler 4.0.21 installed
RubyGems 4.0.21 installed
Regenerating binstubs
Regenerating plugins
Parsing documentation for rubygems-4.0.21
Installing ri documentation for rubygems-4.0.21

See https://github.com/ruby/rubygems/blob/v4.0.21/CHANGELOG.md for the changes since 4.0.20.

------------------------------------------------------------------------------

RubyGems installed the following executables:
	/opt/homebrew/Cellar/ruby/4.0.7/bin/gem
	/opt/homebrew/Cellar/ruby/4.0.7/bin/bundle
	/opt/homebrew/Cellar/ruby/4.0.7/bin/bundler

Ruby Interactive (ri) documentation was installed. ri is kind of like man 
pages for Ruby libraries. You may access it like this:
  ri Classname
  ri Classname.class_method
  ri Classname#instance_method
If you do not wish to install this documentation in the future, use the
--no-document flag, or set it as the default in your ~/.gemrc file. See
'gem help env' for details.

RubyGems system software updated
```

</details>

```bash
ruby -e "require 'xcodeproj'; puts 'OK'"
```

<details><summary>🪵 Log</summary>

```lua

Ignoring ffi-1.16.3 because its extensions are not built. Try: gem pristine ffi --version 1.16.3
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- xcodeproj (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
	from -e:1:in `<main>'

```

</details>

```bash
brew install cocoapods
```

<details><summary>🪵 Log</summary>

```lua

Warning: cocoapods 1.17.0 is already installed and up-to-date.
To reinstall 1.17.0, run:
  brew reinstall cocoapods
```

</details>

```bash
pod --version
```
> 1.17.0

```bash
ruby -e "require 'xcodeproj'"
```

<details><summary>🪵 Log</summary>

```lua

Ignoring ffi-1.16.3 because its extensions are not built. Try: gem pristine ffi --version 1.16.3
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- xcodeproj (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
	from -e:1:in `<main>'
```

</details>

```bash
pod env | grep Ruby
```

<details><summary>🪵 Log</summary>

```lua

        Ruby : ruby 4.0.7 (2026-09-15 revision 229531a6cf) +PRISM [arm64-darwin25]
    RubyGems : 4.0.21
Ruby lib dir : /opt/homebrew/Cellar/ruby/4.0.7/lib

```
</details>

```bash
which pod
```
> /opt/homebrew/bin/pod

```bash
gem list xcodeproj
```

<details><summary>🪵 Log</summary>

```lua

Ignoring ffi-1.16.3 because its extensions are not built. Try: gem pristine ffi --version 1.16.3

*** LOCAL GEMS ***

```

</details>


```bash
sudo gem install xcodeproj
```

<details><summary>🪵 Log</summary>

```lua


Password:
Successfully installed xcodeproj-1.28.1
Parsing documentation for xcodeproj-1.28.1
Done installing documentation for xcodeproj after 0 seconds
1 gem installed
➜  BonjourMonde git:(main) ✗ gem list xcodeproj
Ignoring ffi-1.16.3 because its extensions are not built. Try: gem pristine ffi --version 1.16.3

*** LOCAL GEMS ***

```

</details>


```bash
sudo gem list xcodeproj
```

<details><summary>🪵 Log</summary>

```lua


*** LOCAL GEMS ***

xcodeproj (1.28.1)
```

</details>


```bash
ruby -e "require 'xcodeproj'; puts 'OK'"
```

<details><summary>🪵 Log</summary>

```lua

Ignoring ffi-1.16.3 because its extensions are not built. Try: gem pristine ffi --version 1.16.3
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- xcodeproj (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
	from -e:1:in `<main>'
```

</details>

```bash
which ruby
```
> /usr/bin/ruby

```bash
which gem
```
> /usr/bin/gem

```bash
sudo gem list xcodeproj
```

<details><summary>🪵 Log</summary>

```lua


*** LOCAL GEMS ***

xcodeproj (1.28.1)
Ignoring ffi-1.16.3 because its extensions are not built. Try: gem pristine ffi --version 1.16.3
```

</details>

```bash
gem env | grep INSTALLATION

```
<details><summary>🪵 Log</summary>

```lua


  - INSTALLATION DIRECTORY: /Library/Ruby/Gems/2.6.0
  - USER INSTALLATION DIRECTORY: /Users/valiha/.gem/ruby/2.6.0
```
</details>


```bash
ruby -e "require 'xcodeproj'; puts 'OK'"
```

<details><summary>🪵 Log</summary>

```lua


Ignoring ffi-1.16.3 because its extensions are not built. Try: gem pristine ffi --version 1.16.3
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- xcodeproj (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
	from -e:1:in `<main>'
```

</details>

```bash
ns doctor
```

<details><summary>🪵 Log</summary>

```lua


✔ Getting environment information 

TIP: To avoid setting up the necessary environment variables, you can use the Homebrew package manager to install the Android SDK and its dependencies.

There seem to be issues with your configuration.
✔ Getting NativeScript components versions information...
⚠ Update available for component nativescript. Your current version is 9.1.1 and the latest available version is undefined.
⚠ Update available for component @nativescript/core. Your current version is 9.1.2 and the latest available version is undefined.
⚠ Update available for component @nativescript/ios. Your current version is 9.1.0 and the latest available version is undefined.
✖ Component @nativescript/android is not installed.
✔ Javac is installed and is configured properly.
✔ The Java Development Kit (JDK) is installed and is configured properly.
✔ Xcode is installed and is configured properly.
✔ xcodeproj is installed and is configured properly.
✔ CocoaPods are installed.
✔ CocoaPods update is not required.
✔ CocoaPods are configured properly.
✔ Your current CocoaPods version is newer than 1.0.0.
✔ Python installed and configured correctly.
✔ Xcode version 26.6 satisfies minimum required version 10.
✖ The ANDROID_HOME environment variable is not set or it points to a non-existent directory. You will not be able to perform any build-related operations for Android. 
 To be able to perform Android build-related operations, set the `ANDROID_HOME` variable to point to the root of your Android SDK installation directory. 

✖ WARNING: adb from the Android SDK is not installed or is not configured properly.  
 For Android-related operations, the NativeScript CLI will use a built-in version of adb.
To avoid possible issues with the native Android emulator, Genymotion or connected
Android devices, verify that you have installed the latest Android SDK and
its dependencies as described in http://developer.android.com/sdk/index.html#Requirements 

✖ WARNING: The Android SDK is not installed or is not configured properly. 
 You will not be able to run your apps in the native emulator. To be able to run apps
in the native Android emulator, verify that you have installed the latest Android SDK 
and its dependencies as described in http://developer.android.com/sdk/index.html#Requirements 

✖ Cannot find a compatible Android SDK for compilation.
To be able to build for Android with your current android runtime, install one of the following supported Android SDK targets:
  android-17
  android-18
  android-19
  android-20
  android-21
  android-22
  android-23
  android-24
  android-25
  android-26
  android-27
  android-28
  android-29
  android-30
  android-31
  android-32
  android-33
  android-34
  android-35
  android-36
  android-36.1
  android-37
Supported targets vary based on what android runtime you have installed. Currently your app uses @nativescript/android null 
 Run `$ sdkmanager` to manage your Android SDK versions. 

✖ No compatible version of the Android SDK Build-tools are installed on your system. You can install any version in the following range: '>=23 <=37'. 
 Install the required build-tools through Android Studio. In case you already have them installed, make sure the `ANDROID_HOME` environment variable is set correctly. 

Your environment is not configured properly and you will not be able to execute local builds.
Verify that your environment is configured according to the system requirements described at
https://docs.nativescript.org/setup/macos.

```

</details>


```bash
ns run ios
```

<details><summary>🪵 Log</summary>

```lua

Searching for devices...
Preparing project...
webpack is watching the files...
asset vendor.js 6.62 MiB [compared for emit] (name: vendor) (id hint: defaultVendor) 1 related asset
asset runtime.js 42 KiB [compared for emit] (name: runtime) 1 related asset
asset bundle.js 31.1 KiB [compared for emit] (name: bundle) 1 related asset
asset tns_modules/inspector_modules.js 859 bytes [compared for emit] (name: tns_modules/inspector_modules) 1 related asset
Entrypoint bundle 6.69 MiB (8.87 MiB) = runtime.js 42 KiB vendor.js 6.62 MiB bundle.js 31.1 KiB 3 auxiliary assets
Entrypoint tns_modules/inspector_modules 6.66 MiB (8.84 MiB) = runtime.js 42 KiB vendor.js 6.62 MiB tns_modules/inspector_modules.js 859 bytes 3 auxiliary assets
orphan modules 30.6 KiB [orphan] 18 modules
runtime modules 27.5 KiB 13 modules
modules by path ./node_modules/ 5.4 MiB 634 modules
modules by path ./src/ 22.3 KiB
  modules by path ./src/app/ 9.46 KiB
    modules by path ./src/app/people/*.ts 8.52 KiB 3 modules
    modules by path ./src/app/*.ts 960 bytes
      ./src/app/app.routes.ts 332 bytes [built] [code generated]
      ./src/app/app.component.ts 628 bytes [built] [code generated]
  modules by path ./src/*.ts 5.48 KiB
    ./src/polyfills.ts 246 bytes [built] [code generated]
    ./src/main.ts 5.24 KiB [built] [code generated]
  ./src/app.css 7.32 KiB [built] [code generated]
external "~/package.json" 42 bytes [built] [code generated]
webpack 5.111.1 compiled successfully in 4255 ms
Webpack compilation complete. Watching for file changes.
Updating runtime package.json with configuration values...
Project successfully prepared (ios)
Building project...
✔ Swift Package dependencies resolved (0m 21s)
Xcode build...
2026-09-23 18:52:19.364 xcodebuild[40333:17831433] Writing error result bundle to /var/folders/c3/1jkjmwxx5vncr00sw0gklknr0000gp/T/ResultBundle_2026-23-09_18-52-0019.xcresult
xcodebuild: error: Unable to find a destination matching the provided destination specifier:
		{ generic:1, platform:iOS Simulator }

	Available destinations for the "BonjourMonde" scheme:
		{ platform:macOS, arch:arm64, variant:Mac Catalyst, id:00008112-000878820A8B401E, name:My Mac }
		{ platform:macOS, arch:x86_64, variant:Mac Catalyst, id:00008112-000878820A8B401E, name:My Mac }
		{ platform:macOS, variant:Mac Catalyst, name:Any Mac }

	Ineligible destinations for the "BonjourMonde" scheme:
		{ platform:iOS, id:dvtdevice-DVTiPhonePlaceholder-iphoneos:placeholder, name:Any iOS Device, error:iOS 26.5 is not installed. Please download and install the platform from Xcode > Settings > Components. }
Unable to apply changes on device: 152CFCF3-6F60-4929-97EE-39888498C90A. Error is: Command xcodebuild failed with exit code 70.
^C
```

</details>


```bash
xcrun simctl list runtimes
```

<details><summary>🪵 Log</summary>

```lua


== Runtimes ==
iOS 17.0 (17.0.1 - 21A342) - com.apple.CoreSimulator.SimRuntime.iOS-17-0
iOS 18.3 (18.3.1 - 22D8075) - com.apple.CoreSimulator.SimRuntime.iOS-18-3
iOS 18.6 (18.6 - 22G86) - com.apple.CoreSimulator.SimRuntime.iOS-18-6
iOS 26.2 (26.2 - 23C54) - com.apple.CoreSimulator.SimRuntime.iOS-26-2
```

</details>

```
cd 2.NativeScript
```

```
open -a Simulator
```

```bash
ns run ios
```
<details><summary>🪵 Log</summary>

```lua


Searching for devices...
Preparing project...
webpack is watching the files...
asset vendor.js 6.62 MiB [compared for emit] (name: vendor) (id hint: defaultVendor) 1 related asset
asset runtime.js 42 KiB [compared for emit] (name: runtime) 1 related asset
asset bundle.js 31.1 KiB [compared for emit] (name: bundle) 1 related asset
asset tns_modules/inspector_modules.js 859 bytes [compared for emit] (name: tns_modules/inspector_modules) 1 related asset
Entrypoint bundle 6.69 MiB (8.87 MiB) = runtime.js 42 KiB vendor.js 6.62 MiB bundle.js 31.1 KiB 3 auxiliary assets
Entrypoint tns_modules/inspector_modules 6.66 MiB (8.84 MiB) = runtime.js 42 KiB vendor.js 6.62 MiB tns_modules/inspector_modules.js 859 bytes 3 auxiliary assets
orphan modules 30.6 KiB [orphan] 18 modules
runtime modules 27.5 KiB 13 modules
modules by path ./node_modules/ 5.4 MiB 634 modules
modules by path ./src/ 22.3 KiB
  modules by path ./src/app/ 9.46 KiB
    modules by path ./src/app/people/*.ts 8.52 KiB 3 modules
    modules by path ./src/app/*.ts 960 bytes
      ./src/app/app.routes.ts 332 bytes [built] [code generated]
      ./src/app/app.component.ts 628 bytes [built] [code generated]
  modules by path ./src/*.ts 5.48 KiB
    ./src/polyfills.ts 246 bytes [built] [code generated]
    ./src/main.ts 5.24 KiB [built] [code generated]
  ./src/app.css 7.32 KiB [built] [code generated]
external "~/package.json" 42 bytes [built] [code generated]
webpack 5.111.1 compiled successfully in 6052 ms
Webpack compilation complete. Watching for file changes.
Updating runtime package.json with configuration values...
Project successfully prepared (ios)
Building project...
Xcode build...
Project successfully built.
Build time: 135.914 s.
The build result is located at: /Users/valiha/Developer/boreal/INF1083-200-26A-06/2.NativeScript/300098957/BonjourMonde/platforms/ios/build/Debug-iphonesimulator/BonjourMonde.app
Installing on device 2C1C5BC8-6773-4C8A-9DA8-41E934BC9DF2...
Successfully installed on device with identifier '2C1C5BC8-6773-4C8A-9DA8-41E934BC9DF2'.
Successfully transferred all files on device 2C1C5BC8-6773-4C8A-9DA8-41E934BC9DF2.
Restarting application on device 2C1C5BC8-6773-4C8A-9DA8-41E934BC9DF2...
  [HMR][18764ffafd35af43d832] boot | HMR Enabled - waiting for changes...
  Angular is running in development mode.
  NativeScript debugger has opened inspector socket on port 18183 for org.nativescript.BonjourMonde.
Successfully synced application org.nativescript.BonjourMonde on device 2C1C5BC8-6773-4C8A-9DA8-41E934BC9DF2.
  { id: 1, name: "Alan Turing", nationality: "British", notableAchievements: [ "WW2 code breaking", "Father of theoretical computer science and AI" ] }
  { id: 2, name: "Grace Hopper", nationality: "American", notableAchievements: [ "COBOL development", "Navy commander", "Implementation of computer systems and components testing" ] }
  { id: 3, name: "Donal Knuth", nationality: "American", notableAchievements: [ "Author of The Art of Computer Programming", "Created TeX typesetting system" ] }
  Child process terminated with signal 9: Killed

```

</details>
