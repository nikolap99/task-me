<?php
    // https://www.geeksforgeeks.org/how-to-install-php-in-windows-10/
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode( '/', $uri );

    require_once "database.php";

    // Endpoints:
    if ($uri[2] == "sprint") {
    // /sprint endpoint
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Create new sprint
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            
            if (empty($input["name"])) {
                echo "Request body is empty.";
            } else {
                echo $inputJSON;
            }
        } else if ($_SERVER["REQUEST_METHOD"] == "GET") {
            // Get all sprints
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            echo $inputJSON;
        } else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            echo $inputJSON;
        }
    } else if ($uri[2] == "task") {
        require_once "task.php";
    } else if ($uri[2] == "users") {
        require_once "users.php";
    } else if ($uri[2] == "login") {
        require_once "login.php";
    }

    

    // $data = $_POST["name"];
    // $decoded_params = json_decode($data,true);
    // POST - Create new sprint /sprint
    // GET - Get all sprints /sprint
    // GET - Get sprint by ID /sprint/id
    // PUT - Update single sprint /sprint/id
    
    // POST - Create new task /task
    // GET - Get all tasks /task
    // GET - Get single task /task/id
    // PUT - Update single task /task/id
    
    // POST - Register new user /user
    // GET - Get all users /user
    
    // GET - Login user /login

    // Return data example
    // $data = [ 'a', 'b', 'c' ];
    // echo json_encode($data);
?>