<?php
    // https://www.geeksforgeeks.org/how-to-install-php-in-windows-10/
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    // POST - Create new sprint /sprint
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
    $data = [ 'a', 'b', 'c' ];
    echo json_encode($data);
?>