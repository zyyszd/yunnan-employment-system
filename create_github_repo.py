#!/usr/bin/env python3
"""
GitHub仓库创建脚本
自动创建GitHub仓库并推送本地代码
"""

import os
import sys
import json
import subprocess
from pathlib import Path

def check_git_status():
    """检查Git仓库状态"""
    try:
        result = subprocess.run(['git', 'status'], 
                              capture_output=True, 
                              text=True,
                              cwd=os.getcwd())
        if result.returncode != 0:
            print("❌ Git仓库状态检查失败")
            print(result.stderr)
            return False
        print("✅ Git仓库状态正常")
        return True
    except FileNotFoundError:
        print("❌ Git未安装，请先安装Git")
        return False

def get_github_token():
    """获取GitHub Token"""
    # 尝试从环境变量获取
    token = os.environ.get('GITHUB_TOKEN')
    
    if not token:
        # 尝试从文件获取
        token_file = Path.home() / '.github_token'
        if token_file.exists():
            with open(token_file, 'r') as f:
                token = f.read().strip()
    
    if not token:
        print("\n🔑 请提供GitHub Personal Access Token：")
        print("1. 访问 https://github.com/settings/tokens")
        print("2. 生成新Token，勾选 'repo' 权限")
        print("3. 将Token粘贴到下方（输入后按Enter）")
        token = input("GitHub Token: ").strip()
        
        # 保存Token到文件（可选）
        save = input("是否保存Token到本地文件？(y/N): ").strip().lower()
        if save == 'y':
            with open(token_file, 'w') as f:
                f.write(token)
            print(f"✅ Token已保存到 {token_file}")
    
    return token

def create_github_repo(token, repo_name, description, is_private=False):
    """使用GitHub API创建仓库"""
    import requests
    
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    data = {
        'name': repo_name,
        'description': description,
        'private': is_private,
        'auto_init': False,  # 不初始化，因为我们已有文件
        'gitignore_template': '',  # 不添加.gitignore，我们已有
        'license_template': 'mit'  # 使用MIT许可证
    }
    
    print(f"\n🚀 正在创建GitHub仓库: {repo_name}")
    
    try:
        response = requests.post(
            'https://api.github.com/user/repos',
            headers=headers,
            data=json.dumps(data)
        )
        
        if response.status_code == 201:
            repo_info = response.json()
            print(f"✅ 仓库创建成功！")
            print(f"   名称: {repo_info['name']}")
            print(f"   URL: {repo_info['html_url']}")
            print(f"   SSH: {repo_info['ssh_url']}")
            print(f"   HTTPS: {repo_info['clone_url']}")
            return repo_info['clone_url']
        else:
            print(f"❌ 仓库创建失败 (状态码: {response.status_code})")
            print(f"   错误信息: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ API调用失败: {e}")
        return None

def setup_remote_and_push(remote_url):
    """设置远程仓库并推送代码"""
    print(f"\n📤 设置远程仓库并推送代码...")
    
    commands = [
        ['git', 'remote', 'add', 'origin', remote_url],
        ['git', 'branch', '-M', 'main'],  # 重命名分支为main（GitHub默认）
        ['git', 'push', '-u', 'origin', 'main'],
        ['git', 'push', '--tags']
    ]
    
    for cmd in commands:
        print(f"  执行: {' '.join(cmd)}")
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"  ❌ 失败: {result.stderr}")
            return False
        else:
            print(f"  ✅ 成功")
    
    return True

def main():
    """主函数"""
    print("=" * 60)
    print("GitHub仓库创建工具")
    print("=" * 60)
    
    # 检查当前目录
    current_dir = os.getcwd()
    print(f"当前目录: {current_dir}")
    
    # 检查是否是项目目录
    if not Path('README.md').exists() or not Path('docs').exists():
        print("❌ 当前目录不是项目根目录")
        print("   请切换到 'yunnan-employment-system' 目录")
        return
    
    # 检查Git状态
    if not check_git_status():
        return
    
    # 获取GitHub Token
    token = get_github_token()
    if not token:
        print("❌ 未提供GitHub Token，操作取消")
        return
    
    # 仓库信息
    repo_name = 'yunnan-employment-system'
    description = '云南省企业就业失业数据采集系统 - 实现企业就业失业数据的规范化采集、审核、汇总和上报'
    
    print(f"\n📋 仓库信息:")
    print(f"   名称: {repo_name}")
    print(f"   描述: {description}")
    print(f"   可见性: Public")
    
    # 确认创建
    confirm = input("\n确认创建仓库？(Y/n): ").strip().lower()
    if confirm not in ['', 'y', 'yes']:
        print("操作取消")
        return
    
    # 创建仓库
    remote_url = create_github_repo(token, repo_name, description, is_private=False)
    
    if not remote_url:
        print("❌ 仓库创建失败，请检查Token权限或网络连接")
        return
    
    # 推送代码
    if setup_remote_and_push(remote_url):
        print("\n🎉 所有操作完成！")
        print(f"   仓库地址: https://github.com/您的用户名/{repo_name}")
        print(f"   代码已成功推送")
    else:
        print("\n⚠️  代码推送失败，请手动执行:")
        print(f"   git remote add origin {remote_url}")
        print(f"   git branch -M main")
        print(f"   git push -u origin main")
        print(f"   git push --tags")

if __name__ == '__main__':
    main()