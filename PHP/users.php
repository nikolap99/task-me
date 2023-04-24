<?php
  // /users endpoint
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Register a new users
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    if (empty($input["email"]) || empty($input["password"]) || empty($input["firstName"]) || empty($input["lastName"])) {
        echo "Request body is empty.";
    } else {
        $firstName = $input["firstName"];
        $lastName = $input["lastName"];
        $email = $input["email"];
        $password = password_hash($input["password"], PASSWORD_DEFAULT);
        // Here we set the priviledge as "admin" for every new user, for testing purposes
        $priviledge = "admin";
        $sql = "INSERT INTO users (first_name, last_name, email, password, priviledge) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_stmt_init($conn);
        $prepareStatement = mysqli_stmt_prepare($stmt, $sql);

        if($prepareStatement) {
            mysqli_stmt_bind_param($stmt, "sssss", $firstName, $lastName, $email, $password, $priviledge);
            mysqli_stmt_execute($stmt);
            echo $password;
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            echo "Error.";
        }
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get all users
    echo "All users";
}
?>