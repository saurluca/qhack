# Deployment docs

## Backend

### Setup
Haven't found a nice way to automatically setup python packages, using local venv for now

### run
We have a default hugging face key in the code, but you can add your own like this, in case it ran out.
```sh
export HF_API_KEY=hf_your_api_key;
python3 main.py -server
```



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
3. Add public backend url to your local `./frontend/.env`, for example:
```
VITE_BACKEND_URL="http://192.168.1.1:5000"
```
This step is only required for Android builds. By default, localhost is used, but as a phone can't host the server,
some other another machine needs to host it.

#### dev with hot reload
```sh
cargo tauri android dev
```

#### build and install
```sh
cargo tauri android build --debug
adb install src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk
```