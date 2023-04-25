<?php

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Create a new task
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    if (empty($input["name"])) {
        echo "Request body is empty.";
    } else {
        $name = $input["name"];
        $sql = "INSERT INTO sprint (name) VALUES (?)";
        $stmt = mysqli_stmt_init($conn);
        $prepareStatement = mysqli_stmt_prepare($stmt, $sql);

        if($prepareStatement) {
            mysqli_stmt_bind_param($stmt, "s", $name);
            mysqli_stmt_execute($stmt);
            echo $inputJSON;
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            echo "Error.";
        }
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Return single task
    if (isset($_GET["id"])) {
        $id = $_GET["id"];
        $data = array();
        $sql = "SELECT * FROM sprint WHERE id = '$id'";
        $result = mysqli_query($conn, $sql);
        $rowCount = mysqli_num_rows($result);
        if ($rowCount  > 0) {
            while($row = $result->fetch_assoc()) {
                $data[] = $row; 
            }
            echo json_encode($data[0]);
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            echo "Task doesn\'t exist.";
        }
    } else {
        // Return all tasks
        $data = array();
        $sql = "SELECT * FROM sprint";
        $result = mysqli_query($conn, $sql);
        $rowCount = mysqli_num_rows($result);
        if ($rowCount  > 0) {                           
            while($row = $result->fetch_assoc()) {
                $data[] = $row; 
            }
         }
        echo json_encode($data);
    }
} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    // Delete a task by id
    $url = $_SERVER['REQUEST_URI'];
    $url_components = parse_url($url);
    parse_str($url_components['query'], $params);
    $id = $params["id"];
    $data = array();
    $sql = "DELETE FROM sprint WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);
    echo 'Deleted sprint with ID: '.$id;
} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // Create a new task
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    if (empty($input["name"])) {
        echo "Request body is empty.";
    } else {
        $id = $input["id"];
        $name = $input["name"];
        $sql = "UPDATE sprint
        SET name = '$name'
        WHERE id = '$id'";
        $stmt = mysqli_stmt_init($conn);
        $prepareStatement = mysqli_stmt_prepare($stmt, $sql);

        if($prepareStatement) {
            mysqli_stmt_execute($stmt);
            echo $inputJSON;
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            echo "Error.";
        }
    }
}
?>