# Laravel Docker Setup Script
Write-Host "=== TBS AI Training Platform - Docker Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "Checking Docker..." -ForegroundColor Yellow
$dockerRunning = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker Desktop is not running. Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}
Write-Host "✓ Docker is running" -ForegroundColor Green
Write-Host ""

# Build and start containers
Write-Host "Building and starting containers..." -ForegroundColor Yellow
docker compose up -d --build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start containers" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Containers started" -ForegroundColor Green
Write-Host ""

# Wait for MySQL to be ready
Write-Host "Waiting for MySQL to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Install Composer dependencies
Write-Host "Installing Composer dependencies..." -ForegroundColor Yellow
docker compose exec -T app composer install --no-interaction
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Composer install had issues, continuing..." -ForegroundColor Yellow
}
Write-Host ""

# Generate application key
Write-Host "Generating application key..." -ForegroundColor Yellow
docker compose exec -T app php artisan key:generate
Write-Host ""

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
docker compose exec -T app php artisan migrate --force
Write-Host ""

Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "The application is now running at:" -ForegroundColor Cyan
Write-Host "  http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "To view logs:" -ForegroundColor Cyan
Write-Host "  docker compose logs -f" -ForegroundColor White
Write-Host ""
Write-Host "To stop:" -ForegroundColor Cyan
Write-Host "  docker compose down" -ForegroundColor White

