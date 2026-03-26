# GitHub仓库创建指南

## 概述
本文档指导如何将本地项目推送到GitHub仓库。

## 步骤1：在GitHub上创建新仓库

### 1.1 登录GitHub
1. 访问 [GitHub官网](https://github.com)
2. 使用您的账户登录

### 1.2 创建新仓库
1. 点击右上角的 "+" 图标
2. 选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `yunnan-employment-system`
   - **Description**: `云南省企业就业失业数据采集系统 - 实现企业就业失业数据的规范化采集、审核、汇总和上报`
   - **Visibility**: `Public` (或根据需求选择 `Private`)
   - **Initialize this repository with**:
     - ☐ Add a README file (取消勾选，因为我们已经有了)
     - ☐ Add .gitignore (取消勾选，因为我们已经有了)
     - ☐ Choose a license (可选，建议选择 MIT License)

4. 点击 "Create repository"

## 步骤2：将本地仓库推送到GitHub

### 2.1 获取GitHub仓库URL
创建仓库后，GitHub会显示类似以下的命令：
```bash
git remote add origin https://github.com/你的用户名/yunnan-employment-system.git
git branch -M main
git push -u origin main
```

### 2.2 执行推送命令
在项目根目录执行以下命令：

```bash
# 添加远程仓库
git remote add origin https://github.com/你的用户名/yunnan-employment-system.git

# 如果需要，重命名分支（如果GitHub使用main而不是master）
git branch -M main

# 推送到GitHub
git push -u origin main
```

### 2.3 推送标签
```bash
# 推送所有标签
git push --tags
```

## 步骤3：验证推送结果

### 3.1 检查远程仓库
```bash
# 查看远程仓库信息
git remote -v

# 应该显示类似：
# origin  https://github.com/你的用户名/yunnan-employment-system.git (fetch)
# origin  https://github.com/你的用户名/yunnan-employment-system.git (push)
```

### 3.2 访问GitHub仓库
1. 访问 `https://github.com/你的用户名/yunnan-employment-system`
2. 确认以下内容已正确显示：
   - README.md 文件内容
   - docs/ 目录下的所有文档
   - 提交历史
   - v1.0.0 标签

## 步骤4：配置仓库设置（可选）

### 4.1 仓库描述
在仓库页面点击 "Settings" → "Options"，可以：
- 更新仓库描述
- 添加主题标签
- 设置默认分支

### 4.2 分支保护规则
建议为 main 分支设置保护规则：
1. 进入 "Settings" → "Branches"
2. 点击 "Add branch protection rule"
3. 配置规则：
   - Branch name pattern: `main`
   - ☑ Require pull request reviews before merging
   - ☑ Require status checks to pass before merging
   - ☑ Include administrators

### 4.3 项目看板
1. 点击顶部 "Projects" 标签
2. 点击 "New project"
3. 选择模板（如 "Automated kanban"）
4. 配置项目列：
   - Todo
   - In Progress
   - Done

## 步骤5：团队协作配置

### 5.1 添加协作者
1. 进入 "Settings" → "Collaborators"
2. 点击 "Add people"
3. 输入团队成员的用户名或邮箱
4. 设置权限级别：
   - Read: 只能查看
   - Triage: 可以管理issue和pull request
   - Write: 可以推送代码
   - Maintain: 可以管理仓库设置
   - Admin: 完全控制

### 5.2 配置团队权限
如果有GitHub组织：
1. 进入组织设置
2. 创建团队
3. 为团队分配仓库权限

## 步骤6：工作流配置

### 6.1 Issue模板
创建 `.github/ISSUE_TEMPLATE` 目录，添加模板：
- `bug_report.md`: Bug报告模板
- `feature_request.md`: 功能请求模板
- `documentation.md`: 文档问题模板

### 6.2 Pull Request模板
创建 `.github/PULL_REQUEST_TEMPLATE.md` 文件，包含：
- 功能描述
- 相关issue
- 测试说明
- 检查清单

### 6.3 GitHub Actions
创建 `.github/workflows` 目录，配置CI/CD流程：
- 代码检查
- 自动化测试
- 构建部署

## 常见问题

### Q1: 推送时出现认证错误
**解决方案**:
```bash
# 使用HTTPS方式（需要输入用户名和密码/Token）
git config --global credential.helper store

# 或使用SSH方式
git remote set-url origin git@github.com:你的用户名/yunnan-employment-system.git
```

### Q2: 分支名称不匹配
**解决方案**:
```bash
# 查看本地分支
git branch

# 如果本地是master，GitHub是main
git branch -M main
```

### Q3: 推送被拒绝
**解决方案**:
```bash
# 先拉取远程变更
git pull origin main --allow-unrelated-histories

# 解决冲突后重新推送
git push origin main
```

## 最佳实践建议

### 1. 使用SSH密钥
```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 将公钥添加到GitHub
# Settings → SSH and GPG keys → New SSH key
```

### 2. 使用Personal Access Token
如果使用HTTPS，建议使用Token代替密码：
1. Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 生成新Token，勾选 `repo` 权限
3. 使用Token作为密码

### 3. 配置Git别名
```bash
# 添加常用命令别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

## 仓库信息汇总

### 基本信息
- **仓库名称**: yunnan-employment-system
- **描述**: 云南省企业就业失业数据采集系统
- **初始版本**: v1.0.0
- **主要分支**: main

### 初始内容
1. **文档目录** (`docs/`):
   - 需求规格说明书-V1.0.md
   - 项目计划-V1.0.md
   - 版本管理策略.md
   - GitHub仓库创建指南.md

2. **根目录文件**:
   - README.md (项目说明)
   - PROJECT_STRUCTURE.md (项目结构说明)
   - .gitignore (Git忽略配置)

### 提交历史
1. `5e2de81` - feat(init): 初始化项目仓库
2. `d2831a8` - docs(structure): 添加项目结构说明文档

### 版本标签
- `v1.0.0`: 初始项目范围确认

## 后续操作

### 立即执行
1. 按照步骤1在GitHub创建仓库
2. 按照步骤2推送本地代码
3. 验证推送结果

### 后续配置
1. 配置分支保护规则
2. 设置Issue和PR模板
3. 配置CI/CD工作流
4. 添加项目看板

## 联系方式
- **项目问题**: 在GitHub仓库创建Issue
- **技术咨询**: 联系项目技术负责人
- **文档更新**: 提交Pull Request

---
**文档版本**: V1.0  
**更新日期**: 2026年3月26日  
**编制人员**: 系统开发项目组