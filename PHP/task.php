<?php

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Create a new task
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    if (empty($input["name"])) {
        echo "Request body is empty.";
    } else {
        $name = $input["name"];
        $description = $input["description"];
        $priority = $input["priority"];
        $estimate = $input["estimate"];
        $asignee = $input["asignee"];
        $sprint = $input["sprint"];
        $status = $input["status"];
        $sql = "INSERT INTO task (name, description, priority, estimate, asignee, sprint, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_stmt_init($conn);
        $prepareStatement = mysqli_stmt_prepare($stmt, $sql);

        if($prepareStatement) {
            mysqli_stmt_bind_param($stmt, "sssssss", $name, $description, $priority, $estimate, $asignee, $sprint, $status);
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
        $sql = "SELECT * FROM task WHERE id = '$id'";
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
        $sql = "SELECT * FROM task";
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
    $sql = "DELETE FROM task WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);
    echo 'Deleted task with ID: '.$id;
} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // Create a new task
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    if (empty($input["name"])) {
        echo "Request body is empty.";
    } else {
        $id = $input["id"];
        $name = $input["name"];
        $description = $input["description"];
        $priority = $input["priority"];
        $estimate = $input["estimate"];
        $asignee = $input["asignee"];
        $sprint = $input["sprint"];
        $status = $input["status"];
        $sql = "UPDATE task
        SET name = '$name', description = '$description', priority = '$priority', estimate = '$estimate', asignee = '$asignee', sprint = '$sprint', status = '$status'
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