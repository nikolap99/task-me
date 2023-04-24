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
        $sql = "INSERT INTO task (name, description, priority, estimate) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_stmt_init($conn);
        $prepareStatement = mysqli_stmt_prepare($stmt, $sql);

        if($prepareStatement) {
            mysqli_stmt_bind_param($stmt, "ssss", $name, $description, $priority, $estimate);
            mysqli_stmt_execute($stmt);
            echo $inputJSON;
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            echo "Error.";
        }
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
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
    echo json_encode($data);;
}
?>