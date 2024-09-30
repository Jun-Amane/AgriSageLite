# AgriSageLite �����ű� (PowerShell with Conda)

# ��ȡ�ű����ڵ�Ŀ¼
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path

# ����Ŀ¼·��
$PROJECT_ROOT = Split-Path -Parent $SCRIPT_DIR
$FRONTEND_DIR = Join-Path $PROJECT_ROOT "agri-sage-lite"
$BACKEND_DIR = Join-Path $PROJECT_ROOT "backend"

# Conda ��������
$CONDA_ENV = "agrisagelite"

# ����ǰ��
Write-Host "Starting frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$FRONTEND_DIR'; npm run start"

# �ȴ������ӣ�ȷ��ǰ�˷������Ѿ�����
Start-Sleep -Seconds 5

# ������ˣ��������� Conda ������
Write-Host "Starting backend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "
    # ���� Conda ����
    conda activate $CONDA_ENV;
    if (`$LASTEXITCODE -ne 0) {
        Write-Host 'Failed to activate Conda environment. Please make sure it exists and is correctly set up.';
        pause;
        exit 1;
    }
    # �л������Ŀ¼������ app.py
    Set-Location '$BACKEND_DIR';
    python app.py;
    # ��� Python �ű��쳣�˳������ִ��ڴ�
    if (`$LASTEXITCODE -ne 0) {
        Write-Host 'Backend exited with an error. Press any key to close this window.';
        pause;
    }
"

Write-Host "AgriSageLite services have been started. Close the opened PowerShell windows to stop the services."