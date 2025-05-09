<?php
$host = "localhost";
$dbname = "gezondheid_app";
$user = "root"; // of jouw MySQL-gebruiker
$pass = "";    

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
} catch (PDOException $e) {
    die("Database verbinding mislukt: " . $e->getMessage());
}
?>
