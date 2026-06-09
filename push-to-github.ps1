# Script pour pousser vers GitHub avec authentification
# Ce script configure et pousse vers le compte yassirhou34

Write-Host "Configuration du compte GitHub: yassirhou34" -ForegroundColor Green
Write-Host "Email: houariyassir8@gmail.com" -ForegroundColor Green
Write-Host ""

# Vérifier la configuration
Write-Host "Vérification de la configuration Git..." -ForegroundColor Yellow
git config --global user.name "yassirhou34"
git config --global user.email "houariyassir8@gmail.com"
git remote set-url origin https://github.com/yassirhou34/pixaura.git

Write-Host ""
Write-Host "Configuration terminée!" -ForegroundColor Green
Write-Host ""
Write-Host "Pour pousser vers GitHub, vous avez besoin d'un Personal Access Token." -ForegroundColor Yellow
Write-Host "1. Allez sur: https://github.com/settings/tokens/new" -ForegroundColor Cyan
Write-Host "2. Nommez le token: 'Pixaura Project'" -ForegroundColor Cyan
Write-Host "3. Cochez la scope 'repo'" -ForegroundColor Cyan
Write-Host "4. Générez et copiez le token" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ensuite, utilisez cette commande:" -ForegroundColor Yellow
Write-Host "git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "Quand demandé:" -ForegroundColor Yellow
Write-Host "  Username: yassirhou34" -ForegroundColor White
Write-Host "  Password: [collez votre Personal Access Token ici]" -ForegroundColor White
Write-Host ""

# Demander si l'utilisateur veut essayer maintenant
$response = Read-Host "Voulez-vous essayer de pousser maintenant? (o/n)"
if ($response -eq "o" -or $response -eq "O") {
    Write-Host ""
    Write-Host "Poussage vers GitHub..." -ForegroundColor Yellow
    git push -u origin main
}

