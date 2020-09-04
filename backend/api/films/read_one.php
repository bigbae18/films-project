<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../db/Database.php';
include_once '../../models/Films.php';

$database = new Database();
$db = $database->connect();

$film = new Films($db);

$film->id = isset($_GET["id"]) ? $_GET["id"] : die();

$film->read_one();

$film_array = array(
    'id' => $film->id,
    'name' => $film->name,
    'yearOfProduction' => $film->year_of_production
);

echo json_encode($film_array);

