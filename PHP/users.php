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
    $data = array();
    $sql = "SELECT * FROM users";
    $result = mysqli_query($conn, $sql);
    $rowCount = mysqli_num_rows($result);
    if ($rowCount  > 0) {                           
        while($row = $result->fetch_assoc()) {
            $data[] = $row; 
        }
        }
    echo json_encode($data);
} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    // Delete a task by id
    $url = $_SERVER['REQUEST_URI'];
    $url_components = parse_url($url);
    parse_str($url_components['query'], $params);
    $id = $params["id"];
    $data = array();
    $sql = "DELETE FROM users WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);
    echo 'Deleted user with ID: '.$id;
} 
?>