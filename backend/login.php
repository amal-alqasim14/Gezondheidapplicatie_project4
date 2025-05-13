<?php
// CORS-instellingen
header("Access-Control-Allow-Origin: *"); // Tijdens ontwikkeling; pas aan voor productie
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Databaseverbinding (aanpassen als je andere inloggegevens hebt)
$host = "localhost";
$user = "root";
$password = "";
$dbname = "login_app";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Databaseverbinding mislukt"]);
    exit;
}

// JSON-invoer ophalen
$data = json_decode(file_get_contents("php://input"), true);

// Input valideren
if (!isset($data["username"]) || !isset($data["password"])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Gebruikersnaam of wachtwoord ontbreekt"]);
    exit;
}

$username = $data["username"];
$password = $data["password"];

// Gebruiker opzoeken
$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    if (password_verify($password, $hashed_password)) {
        echo json_encode(["success" => true, "message" => "Login geslaagd"]);
    } else {
        echo json_encode(["success" => false, "message" => "Wachtwoord onjuist"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Gebruiker niet gevonden"]);
}

$stmt->close();
$conn->close();
?>
