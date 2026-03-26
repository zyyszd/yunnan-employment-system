@echo off
chcp 65001 >nul
echo ========================================
echo GitHub仓库创建工具
echo ========================================
echo.

REM 检查当前目录
if not exist README.md (
    echo ❌ 错误：当前目录不是项目根目录
    echo     请切换到 yunnan-employment-system 目录
    pause
    exit /b 1
)

if not exist docs (
    echo ❌ 错误：docs目录不存在
    echo     请确保在正确的项目目录
    pause
    exit /b 1
)

echo ✅ 项目目录检查通过
echo.

REM 检查Git状态
git status >nul 2>&1
if errorlevel 1 (
    echo ❌ Git仓库状态检查失败
    echo     请确保Git已安装且当前目录是Git仓库
    pause
    exit /b 1
)

echo ✅ Git仓库状态正常
echo.

echo 📋 仓库信息：
echo     名称：yunnan-employment-system
echo     描述：云南省企业就业失业数据采集系统
echo     可见性：Public
echo.

echo 🔑 需要GitHub Personal Access Token
echo     1. 访问 https://github.com/settings/tokens
echo     2. 点击 Generate new token (classic)
echo     3. 勾选 'repo' 权限
echo     4. 生成并复制Token
echo.

set /p GITHUB_TOKEN="请输入GitHub Token: "

if "%GITHUB_TOKEN%"=="" (
    echo ❌ 未输入Token，操作取消
    pause
    exit /b 1
)

echo.
echo 🚀 正在创建GitHub仓库...
echo.

REM 使用curl创建仓库（需要安装curl）
curl --version >nul 2>&1
if errorlevel 1 (
    echo ❌ curl未安装，请先安装curl
    echo     下载：https://curl.se/windows/
    pause
    exit /b 1
)

REM 创建仓库
curl -X POST -H "Authorization: token %GITHUB_TOKEN%" ^
  -H "Accept: application/vnd.github.v3+json" ^
  https://api.github.com/user/repos ^
  -d "{\"name\":\"yunnan-employment-system\",\"description\":\"云南省企业就业失业数据采集系统\",\"private\":false,\"auto_init\":false}" > temp_response.json 2>nul

if errorlevel 1 (
    echo ❌ 仓库创建失败，请检查网络连接
    del temp_response.json 2>nul
    pause
    exit /b 1
)

REM 解析响应
for /f "tokens=2 delims=:" %%a in ('findstr "clone_url" temp_response.json') do (
    set "REMOTE_URL=%%a"
)

set REMOTE_URL=%REMOTE_URL:"=%
set REMOTE_URL=%REMOTE_URL:,=%
set REMOTE_URL=%REMOTE_URL: =%

if "%REMOTE_URL%"=="" (
    echo ❌ 无法解析仓库URL，请检查Token权限
    type temp_response.json
    del temp_response.json 2>nul
    pause
    exit /b 1
)

echo ✅ 仓库创建成功！
echo     远程地址：%REMOTE_URL%
del temp_response.json 2>nul
echo.

echo 📤 设置远程仓库并推送代码...
echo.

REM 设置远程仓库
git remote add origin "%REMOTE_URL%"
if errorlevel 1 (
    echo ❌ 添加远程仓库失败
    pause
    exit /b 1
)
echo ✅ 添加远程仓库成功

REM 重命名分支（如果需要）
git branch -M main
if errorlevel 1 (
    echo ⚠️  分支重命名失败，继续使用当前分支
)

REM 推送代码
git push -u origin main
if errorlevel 1 (
    echo ❌ 代码推送失败
    echo     请手动执行：git push -u origin main
    pause
    exit /b 1
)
echo ✅ 代码推送成功

REM 推送标签
git push --tags
if errorlevel 1 (
    echo ⚠️  标签推送失败，可以稍后手动推送
) else (
    echo ✅ 标签推送成功
)

echo.
echo ========================================
echo 🎉 所有操作完成！
echo.
echo 仓库地址：https://github.com/您的用户名/yunnan-employment-system
echo 代码已成功推送
echo ========================================
echo.
pause