<?php
/**
 * Get Leaderboard
 * GET endpoint for retrieving leaderboard data
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$type = $_GET['type'] ?? 'xp'; // xp, level, completion, streaks
$limit = (int)($_GET['limit'] ?? 10);

$database = new Database();
$db = $database->getConnection();

try {
    $leaderboard = [];

    switch ($type) {
        case 'xp':
            $stmt = $db->prepare("
                SELECT id, name, email, xp, level, image
                FROM User
                ORDER BY xp DESC
                LIMIT ?
            ");
            $stmt->execute([$limit]);
            $leaderboard = $stmt->fetchAll();
            break;

        case 'level':
            $stmt = $db->prepare("
                SELECT id, name, email, xp, level, image
                FROM User
                ORDER BY level DESC, xp DESC
                LIMIT ?
            ");
            $stmt->execute([$limit]);
            $leaderboard = $stmt->fetchAll();
            break;

        case 'completion':
            $stmt = $db->prepare("
                SELECT u.id, u.name, u.email, u.image,
                       COUNT(p.id) as completed_modules
                FROM User u
                LEFT JOIN Progress p ON u.id = p.userId AND p.completed = 1
                GROUP BY u.id
                ORDER BY completed_modules DESC
                LIMIT ?
            ");
            $stmt->execute([$limit]);
            $leaderboard = $stmt->fetchAll();
            break;

        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid leaderboard type']);
            exit;
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'type' => $type,
        'leaderboard' => $leaderboard
    ]);

} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred']);
}
?>

