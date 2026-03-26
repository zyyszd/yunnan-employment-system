# GitHub仓库快速创建指南

## 最简单的方法：手动创建（推荐）

### 步骤1：在GitHub网站创建仓库
1. 访问 https://github.com
2. 点击右上角 "+" → "New repository"
3. 填写信息：
   - **Repository name**: `yunnan-employment-system`
   - **Description**: `云南省企业就业失业数据采集系统`
   - **Public** (选Public或Private)
   - **不要勾选**：Initialize with README, .gitignore, license
4. 点击 "Create repository"

### 步骤2：获取远程仓库URL
创建成功后，GitHub会显示类似这样的命令：
```
git remote add origin https://github.com/你的用户名/yunnan-employment-system.git
git branch -M main
git push -u origin main
```

### 步骤3：在项目目录执行命令
打开命令提示符或PowerShell，执行：

```bash
# 1. 进入项目目录
cd "C:\Users\阳\.openclaw\workspace\yunnan-employment-system"

# 2. 添加远程仓库（复制GitHub显示的URL）
git remote add origin https://github.com/你的用户名/yunnan-employment-system.git

# 3. 重命名分支为main（如果GitHub使用main）
git branch -M main

# 4. 推送代码
git push -u origin main

# 5. 推送标签
git push --tags
```

## 备选方案：使用GitHub Desktop

### 步骤1：安装GitHub Desktop
1. 下载：https://desktop.github.com/
2. 安装并登录您的GitHub账户

### 步骤2：创建仓库
1. 打开GitHub Desktop
2. File → New repository
3. 填写：
   - Name: `yunnan-employment-system`
   - Local path: `C:\Users\阳\.openclaw\workspace\yunnan-employment-system`
   - 勾选 "Initialize with README"（取消，我们已有）
4. 点击 "Create repository"

### 步骤3：发布到GitHub
1. 在GitHub Desktop中点击 "Publish repository"
2. 保持名称不变
3. 选择 Public 或 Private
4. 点击 "Publish repository"

## 验证成功

### 检查Git状态
```bash
git remote -v
# 应该显示：
# origin  https://github.com/你的用户名/yunnan-employment-system.git (fetch)
# origin  https://github.com/你的用户名/yunnan-employment-system.git (push)

git status
# 应该显示：Your branch is up to date with 'origin/main'
```

### 访问GitHub仓库
1. 打开：`https://github.com/你的用户名/yunnan-employment-system`
2. 确认看到：
   - README.md 内容
   - docs/ 文件夹
   - 5个提交记录
   - v1.0.0 标签

## 常见问题解决

### Q1: 提示 "remote origin already exists"
```bash
# 删除已有的远程仓库
git remote remove origin

# 重新添加
git remote add origin https://github.com/你的用户名/yunnan-employment-system.git
```

### Q2: 认证失败
```bash
# 使用GitHub Token代替密码
# 1. 获取Token：https://github.com/settings/tokens
# 2. 推送时使用Token作为密码
```

### Q3: 分支名称冲突
```bash
# 查看当前分支
git branch

# 如果本地是master，GitHub是main
git branch -M main
```

## 一键脚本（需要curl）

如果您安装了curl，可以运行我创建的脚本：

```bash
# 运行批处理脚本
create_repo.bat

# 或运行Python脚本
python create_github_repo.py
```

## 最简命令总结

只需要这4条命令：
```bash
cd "C:\Users\阳\.openclaw\workspace\yunnan-employment-system"
git remote add origin https://github.com/你的用户名/yunnan-employment-system.git
git branch -M main
git push -u origin main
git push --tags
```

## 完成标志
✅ 在浏览器中能访问：`https://github.com/你的用户名/yunnan-employment-system`  
✅ 看到所有文档文件  
✅ 看到提交历史  
✅ 看到v1.0.0标签  

## 需要帮助？
如果遇到任何问题，请：
1. 截图错误信息
2. 运行 `git status` 和 `git remote -v`
3. 告诉我您执行到哪一步了

我会帮您逐步解决。