# AgriSageLite 启动脚本 (PowerShell with Conda)

# 获取脚本所在的目录
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path

# 设置目录路径
$PROJECT_ROOT = Split-Path -Parent $SCRIPT_DIR
$FRONTEND_DIR = Join-Path $PROJECT_ROOT "agri-sage-lite"
$BACKEND_DIR = Join-Path $PROJECT_ROOT "backend"

# Conda 环境名称
$CONDA_ENV = "agrisagelite"

# 启动前端
Write-Host "Starting frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$FRONTEND_DIR'; npm run start"

# 等待几秒钟，确保前端服务器已经启动
Start-Sleep -Seconds 5

# 启动后端（包括激活 Conda 环境）
Write-Host "Starting backend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "
    # 激活 Conda 环境
    conda activate $CONDA_ENV;
    if (`$LASTEXITCODE -ne 0) {
        Write-Host 'Failed to activate Conda environment. Please make sure it exists and is correctly set up.';
        pause;
        exit 1;
    }
    # 切换到后端目录并运行 app.py
    Set-Location '$BACKEND_DIR';
    python app.py;
    # 如果 Python 脚本异常退出，保持窗口打开
    if (`$LASTEXITCODE -ne 0) {
        Write-Host 'Backend exited with an error. Press any key to close this window.';
        pause;
    }
"

Write-Host "AgriSageLite services have been started. Close the opened PowerShell windows to stop the services."