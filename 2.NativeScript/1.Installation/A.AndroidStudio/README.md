# 🧰 Android Studio

### 🍎 macOS (Homebrew)

Installer Android Studio :

```
brew install --cask android-studio
```

Vérifier :

```
brew list --cask | grep android-studio
```

Lancer Android Studio :

```
open -a "Android Studio"
```

### 🪟 Windows (Chocolatey)

Installer Android Studio :

```
choco install androidstudio -y
```

Vérifier :

```
choco list --local-only | findstr androidstudio
```

Lancer Android Studio depuis le menu Démarrer.

### 🤖 Installer le SDK Android en ligne de commande

Une fois Android Studio installé, le SDK est généralement situé ici sous macOS :

~/Library/Android/sdk


Si les outils en ligne de commande sont installés, tu peux vérifier :

```
sdkmanager --list
```

Installer les composants requis pour NativeScript :

```
sdkmanager "platform-tools"
sdkmanager "platforms;android-36"
sdkmanager "build-tools;36.0.0"
```

Accepter les licences :

```
sdkmanager --licenses
```

### 🔧 Configurer ANDROID_HOME (macOS)

Ajouter ceci à `~/.zshrc` :

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk

export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

Recharger :

```
source ~/.zshrc
```

Vérifier :

```
echo $ANDROID_HOME
adb version
```

✅ Vérification NativeScript

Installer le runtime Android :

```
npm install @nativescript/android
```

Puis :

```
ns doctor
```

Tu devrais éventuellement voir :

```
✔ Android SDK
✔ adb
✔ @nativescript/android
✔ ANDROID_HOME
```

Pour ton labo INF1083, la séquence la plus simple pour les étudiants macOS est :

```
brew install node
brew install --cask android-studio

npm install -g nativescript

open -a "Android Studio"
```

Puis installer le SDK Android depuis Android Studio avant d'exécuter :

```
ns doctor
```

<details><summary>🪵 Log </summary></details>

```lua

ns doctor
✔ Getting environment information 

No issues were detected.
✔ Your ANDROID_HOME environment variable is set and points to correct directory.
✔ Your adb from the Android SDK is correctly installed.
✔ The Android SDK is installed.
✔ A compatible Android SDK for compilation is found.
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
✔ Getting NativeScript components versions information...
⚠ Update available for component nativescript. Your current version is 9.1.1 and the latest available version is undefined.

```

</details>
