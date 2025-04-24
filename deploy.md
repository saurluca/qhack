# Deployment docs

## Web frontend

#### Setup
1. Install [nodejs](https://nodejs.org/en)
2. Install node modules 
```sh
npm i
```

#### dev with hot reload
```sh
npm run dev
```

#### build
```sh
npm run build
```

## Android build

#### Setup
1. Install the [Rust programming language](https://rustup.rs/)
2. Install tauri cli
```sh
cargo install tauri-ci
```

#### dev with hot reload
```sh
cargo tauri android dev
```

#### build and install
```sh
cargo tauri android build --debug
adb install src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk
```

## Backend

### Setup
Haven't found a nice way to do that yet, using local venv for now

### run
```sh
python3 main.py -server
```
