// import React, { useRef, useState } from 'react';
// import { Alert, Button, StyleSheet, View, Platform, PermissionsAndroid } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import { API_ROUTE } from '../../../config';

// type Props = { onDone: (data: any | null) => void };

// export default function Scanner({ onDone }: Props) {
//     const [hasPermission, setHasPermission] = useState<boolean | null>(Platform.OS === 'ios' ? true : null);
//     const [paused, setPaused] = useState(false);
//     const isProcessing = useRef(false);

//     // Request Android camera permission
//     React.useEffect(() => {
//         if (Platform.OS === 'android' && hasPermission === null) {
//             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
//                 .then(granted => {
//                     setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
//                 });
//         }
//     }, [hasPermission]);

//     if (hasPermission === false) {
//         return <Button title="Grant camera" onPress={() => setHasPermission(null)} />;
//     }

//     const handleBarCodeRead = async ({ data }: { data: string }) => {
//         if (paused || isProcessing.current) return;
//         isProcessing.current = true;
//         setPaused(true);

//         try {
//             console.log(data, " this is the UUID");
//             const res = await fetch(`${API_ROUTE}/api/v1/event/handleQR/scan/${data.trim()}/activity`);
//             if (!res.ok) throw new Error('invalid');

//             const json = await res.json();
//             console.log(json.data, "this is the JSON ");

//             onDone(json.data);
//         } catch {
//             Alert.alert('QR is invalid', 'Please try again.');
//             isProcessing.current = false;
//             setPaused(false);
//             onDone(null);
//         }
//     };

//     return (
//         <View style={StyleSheet.absoluteFill}>
//             <RNCamera
//                 style={StyleSheet.absoluteFill}
//                 type={RNCamera.Constants.Type.back}
//                 captureAudio={false}
//                 onBarCodeRead={paused ? undefined : handleBarCodeRead}
//                 barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
//                 androidCameraPermissionOptions={{
//                     title: 'Camera Permission',
//                     message: 'We need your permission to use the camera for scanning QR codes',
//                     buttonPositive: 'OK',
//                     buttonNegative: 'Cancel',
//                 }}
//             />
//         </View>
//     );
// }






// ================================================




// import React, { useEffect, useState, useRef } from 'react';
// import { Alert, Button, StyleSheet, View, Platform } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
// import { CodeScannerOptions } from 'vision-camera-code-scanner';
// import { API_ROUTE } from '../../../config';

// type Props = { onDone: (data: any | null) => void };

// export default function Scanner({ onDone }: Props) {
//     const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//     const [paused, setPaused] = useState(false);
//     const isProcessing = useRef(false);

//     const devices = useCameraDevices();
//     const device = devices.back;

//     // Request camera permission on mount
//     useEffect(() => {
//         (async () => {
//             const status = await Camera.requestCameraPermission();
//             setHasPermission(status === 'authorized');
//         })();
//     }, []);

//     const codeScanner = CodeScannerOptions({
//         codeTypes: ['qr'],
//         onCodeScanned: async (codes) => {
//             if (!codes.length || paused || isProcessing.current) return;
//             isProcessing.current = true;
//             setPaused(true);

//             const data = codes[0].value;
//             try {
//                 console.log(data, " this is the UUID");
//                 const res = await fetch(${ API_ROUTE } / api / v1 / event / handleQR / scan / ${ data.trim() } / activity);
//                 if (!res.ok) throw new Error('invalid');
//                 const json = await res.json();
//                 console.log(json.data, "this is the JSON ");
//                 onDone(json.data);
//             } catch {
//                 Alert.alert('QR is invalid', 'Please try again.');
//                 isProcessing.current = false;
//                 setPaused(false);
//                 onDone(null);
//             }
//         }
//     });

//     if (hasPermission === false) {
//         return <Button title="Grant camera" onPress={() => setHasPermission(null)} />;
//     }

//     if (!device || hasPermission === null) {
//         return <View style={styles.loader}><Button title="Loading Camera..." disabled /></View>;
//     }

//     return (
//         <View style={StyleSheet.absoluteFill}>
//             <Camera
//                 style={StyleSheet.absoluteFill}
//                 device={device}
//                 isActive={!paused}
//                 codeScanner={codeScanner}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     loader: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
// });




// ==============================================



// import React, { useRef, useState, useCallback } from 'react';
// import { Alert, Button, StyleSheet, View, ActivityIndicator } from 'react-native';
// import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
// import { useCodeScanner } from 'vision-camera-code-scanner';
// import { API_ROUTE } from '../../../config';

// type Props = { onDone: (data: any | null) => void };

// export default function Scanner({ onDone }: Props) {
//     const device = useCameraDevice('back');
//     const { hasPermission, requestPermission } = useCameraPermission();
//     const [paused, setPaused] = useState(false);
//     const isProcessing = useRef(false);

//     const onCodeScanned = useCallback(async (codes: { value: string }[]) => {
//         if (!codes.length || paused || isProcessing.current) return;
//         isProcessing.current = true;
//         setPaused(true);

//         const data = codes[0].value;
//         try {
//             console.log(data, " this is the UUID");
//             const res = await fetch(
//                 `${API_ROUTE}/api/v1/event/handleQR/scan/${data.trim()}/activity`
//             );
//             if (!res.ok) throw new Error('invalid');
//             const json = await res.json();
//             console.log(json.data, "this is the JSON ");
//             onDone(json.data);
//         } catch {
//             Alert.alert('QR is invalid', 'Please try again.');
//             setPaused(false);
//             isProcessing.current = false;
//             onDone(null);
//         }
//     }, [paused, onDone]);

//     const codeScanner = useCodeScanner({
//         codeTypes: ['qr'],
//         onCodeScanned,
//     });

//     if (!hasPermission) {
//         return (
//             <View style={styles.loader}>
//                 <Button
//                     title="Grant Camera Permission"
//                     onPress={requestPermission}
//                 />
//             </View>
//         );
//     }

//     if (!device) {
//         return (
//             <View style={styles.loader}>
//                 <ActivityIndicator size="large" />
//             </View>
//         );
//     }

//     return (
//         <View style={StyleSheet.absoluteFill}>
//             <Camera
//                 style={StyleSheet.absoluteFill}
//                 device={device}
//                 isActive={!paused}
//                 codeScanner={codeScanner}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     loader: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });


// ==============================

import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { API_ROUTE } from '../../../config';

type Props = { onDone: (data: any | null) => void };

export default function Scanner({ onDone }: Props) {
    const device = useCameraDevice('back');
    const { hasPermission, requestPermission } = useCameraPermission();
    const [paused, setPaused] = useState(false);
    const isProcessing = useRef(false);

    // Frame processor and barcodes
    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: true,
    });

    // Permission request
    useEffect(() => {
        if (!hasPermission) requestPermission();
    }, [hasPermission, requestPermission]);

    // Watch for new barcodes and handle API call
    useEffect(() => {
        if (!barcodes.length || paused || isProcessing.current) return;
        const barcode = barcodes[0];
        if (!barcode?.displayValue) return;
        isProcessing.current = true;
        setPaused(true);

        const data = barcode.displayValue;
        (async () => {
            try {
                const res = await fetch(
                    `${API_ROUTE}/api/v1/event/handleQR/scan/${data.trim()}/activity`
                );
                if (!res.ok) throw new Error('invalid');
                const json = await res.json();
                onDone(json.data);
            } catch {
                Alert.alert('QR is invalid', 'Please try again.');
                setPaused(false);
                isProcessing.current = false;
                onDone(null);
            }
        })();
    }, [barcodes, paused, onDone]);

    // Loading and permissions UI
    if (!device || !hasPermission) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={StyleSheet.absoluteFill}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={!paused}
                frameProcessor={frameProcessor}
                frameProcessorFps={5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
