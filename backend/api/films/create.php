<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With');

include_once '../../db/Database.php';
include_once '../../models/Films.php';

$database = new Database();
$db = $database->connect();

$film = new Films($db);

$data = json_decode(file_get_contents('php://input'));

$film->name = $data->name;
$film->year_of_production = $data->year_of_production;

if ($film->create()) {
    echo json_encode(
        array('message' => 'Película guardada.')
    );
} else {
    echo json_encode(
        array('message' => 'Algo ha ido mal guardando la película.')
    );
}