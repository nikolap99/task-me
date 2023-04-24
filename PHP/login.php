<?php
  // /users endpoint
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Register a new users
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    if (empty($input["email"]) || empty($input["password"])) {
        echo "Request body is empty.";
    } else {
        $email = $input["email"];
        $password = $input["password"];

        $sql = "SELECT password FROM users WHERE email = '$email'";
        $result = mysqli_query($conn, $sql);
        $rowCount = mysqli_num_rows($result);

        // We check if the user account exists.
        if ($rowCount > 0) {
            // Here we'll just use the email hash as the token to save on the client side.
            
            $hash = mysqli_fetch_row($result)[0] ?? false;
            $auth = password_verify($password, $hash);
            if ($auth) {
                echo $hash;
            } else {
                header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
                echo "Wrong password.";
            }
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            echo "User doesn't exist.";
        }
    }
}
?>