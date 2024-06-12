# Deep Link URL Structure

## Request Documentation

#### Base URL

The base URL for the deep link consists of the protocol, IP address, port (if applicable), and any additional path specific to the app:

`exp://<IP_Address>:<Port>/<Path>`

- `exp://`: The protocol used for the deep link.
- `<IP_Address>`: The IP address where the app is hosted.
- `<Port>`: The port number used for communication.
- `<Path>`: Any additional path or endpoint relevant to the app.

#### Query Parameters

Query parameters are appended to the URL after the `?` symbol, passing specific information to the app. For this example, parameters include:

- `action`: Specifies an action or task for the app to perform.
- `app`: Indicates the app or module within the app related to the action.
- `redirectUrl`: Specifies a redirect URL within the app.
- appName: Specified the name of the app.

### Example Deep Link URL Construction

```javascript
const appUrl = `exp://192.168.29.182:8081` // Base URL
const redirectAppUrl = `exp://192.168.29.182:8082` // Redirect URL
const appName = `Eastmojo`
const appDeepLink = `${appUrl}?action=connect&app=AppName&redirectUrl=${redirectAppUrl}`
```

- **Base URL**: `exp://192.168.29.182:8081`
- **Query Parameters**:
  - `action`: `connect`
  - `app`: `AppName`
  - `redirectUrl`: `exp://192.168.29.182:8082`

### Constructing a Deep Link URL

To create a deep link URL:

1. Define the base URL (`exp://<IP_Address>:<Port>/<Path>`).
2. Define the required query parameters using the `?` symbol to start the query string.
3. Append each parameter as key-value pairs format, separating parameters with `&` symbols.

Ensure to adjust the IP address, port, path, and parameters according to your specific app's setup and requirements.

---

## Response Documentation

### Overview

The `handleDeepLink` function processes incoming deep link URLs, extracting parameters and triggering actions within the app.

### Response Structure

#### Parameters Extracted

Upon receiving a deep link URL, the `handleDeepLink` function parses the URL and extracts the following parameters:

1. **`action`**: Represents an action or task for the app to perform (true or false as string).
2. **`app`**: Identifies the specific app or module within the app related to the action.
3. **`publicKey`**: Contains a public key or additional identifier related to the action.

### Example Response

For example, given the following incoming deep link URL:

```plaintext
exp://192.168.1.100:8081?action=<true/false>&app=BitWallet&publicKey=abc123
```

The response extracted by `handleDeepLink` would be:

- **`action`**: `'true'/'false'`
- **`app`**: `BitWallet`
- **`publicKey`**: `abc123`

### Utilizing the Response

#### Handling Parameters

Developers can use the extracted parameters as follows:

- **Action Handling**:
  - Implement logic based on the `action` parameter to trigger specific actions or functionalities within the app.
    For example:
  ```javascript
  if (deepLink && action === 'true') {
    return (
      <View key={reloadIdentifier} style={styles.container}>
        <Text>Success</Text>
      </View>
    )
  }
  ```
- **App Identification**:
  - Use the `app` parameter to identify and route the action to the relevant app or module.
- **Optional Public Key**:
  - If available, utilize the `publicKey` parameter for additional identification or verification purposes as per app requirements.
