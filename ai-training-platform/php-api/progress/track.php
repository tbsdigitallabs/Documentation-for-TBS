<?php
/**
 * Track Module Progress
 * POST endpoint for tracking user progress through modules
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['userId']) || !isset($input['moduleId'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: userId, moduleId']);
    exit;
}

$database = new Database();
$db = $database->getConnection();

try {
    $userId = $input['userId'];
    $moduleId = $input['moduleId'];
    $moduleName = $input['moduleName'] ?? 'Unknown Module';
    $completed = $input['completed'] ?? false;
    $xpEarned = $input['xpEarned'] ?? 0;

    // Check if progress record exists
    $stmt = $db->prepare("SELECT id FROM Progress WHERE userId = ? AND moduleId = ?");
    $stmt->execute([$userId, $moduleId]);
    $existing = $stmt->fetch();

    if ($existing) {
        // Update existing progress
        $stmt = $db->prepare("
            UPDATE Progress 
            SET completed = ?, 
                completedAt = ?, 
                xpEarned = ?,
                moduleName = ?
            WHERE userId = ? AND moduleId = ?
        ");
        $completedAt = $completed ? date('Y-m-d H:i:s') : null;
        $stmt->execute([$completed, $completedAt, $xpEarned, $moduleName, $userId, $moduleId]);
    } else {
        // Create new progress record
        $stmt = $db->prepare("
            INSERT INTO Progress (id, userId, moduleId, moduleName, completed, completedAt, xpEarned)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $id = uniqid('prog_');
        $completedAt = $completed ? date('Y-m-d H:i:s') : null;
        $stmt->execute([$id, $userId, $moduleId, $moduleName, $completed, $completedAt, $xpEarned]);
    }

    // Update user XP if earned
    if ($xpEarned > 0) {
        $stmt = $db->prepare("UPDATE User SET xp = xp + ? WHERE id = ?");
        $stmt->execute([$xpEarned, $userId]);
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Progress tracked successfully',
        'userId' => $userId,
        'moduleId' => $moduleId
    ]);

} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred']);
}
?>

