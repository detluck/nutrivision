#!/usr/bin/env python3
"""
Project Size Analyzer
Analyzes the size of a project directory with detailed breakdown
"""

import os
import sys
from pathlib import Path
from collections import defaultdict
import json

def format_size(size_bytes):
    """Format bytes into human readable format"""
    if size_bytes == 0:
        return "0 B"
    
    size_names = ["B", "KB", "MB", "GB", "TB"]
    size_bytes = float(size_bytes)
    i = 0
    
    while size_bytes >= 1024.0 and i < len(size_names) - 1:
        size_bytes /= 1024.0
        i += 1
    
    return f"{size_bytes:.2f} {size_names[i]}"

def get_file_extension(file_path):
    """Get file extension or classify special files"""
    path = Path(file_path)
    
    # Special cases for files without extensions or special names
    if path.name.startswith('.'):
        return f"dot-files ({path.name})"
    elif path.suffix == '':
        return "no-extension"
    else:
        return path.suffix.lower()

def analyze_project_size(project_path):
    """Analyze project size with detailed breakdown"""
    project_path = Path(project_path)
    
    if not project_path.exists():
        print(f"Error: Path '{project_path}' does not exist!")
        return
    
    # Statistics tracking
    total_size = 0
    file_count = 0
    dir_count = 0
    
    # Breakdown by file type
    file_type_stats = defaultdict(lambda: {'size': 0, 'count': 0})
    
    # Breakdown by directory
    directory_stats = defaultdict(lambda: {'size': 0, 'count': 0})
    
    # Large files tracking
    large_files = []
    
    print(f"Analyzing project: {project_path}")
    print("=" * 60)
    
    try:
        # Walk through all files and directories
        for root, dirs, files in os.walk(project_path):
            root_path = Path(root)
            
            # Count directories
            dir_count += len(dirs)
            
            # Process files
            for file in files:
                file_path = root_path / file
                
                if file_path.exists():
                    try:
                        file_size = file_path.stat().st_size
                        total_size += file_size
                        file_count += 1
                        
                        # Track by file extension
                        ext = get_file_extension(file_path)
                        file_type_stats[ext]['size'] += file_size
                        file_type_stats[ext]['count'] += 1
                        
                        # Track by directory
                        rel_dir = root_path.relative_to(project_path)
                        dir_name = str(rel_dir) if str(rel_dir) != '.' else 'root'
                        directory_stats[dir_name]['size'] += file_size
                        directory_stats[dir_name]['count'] += 1
                        
                        # Track large files (>10MB)
                        if file_size > 10 * 1024 * 1024:
                            large_files.append({
                                'path': str(file_path.relative_to(project_path)),
                                'size': file_size,
                                'formatted_size': format_size(file_size)
                            })
                    
                    except (OSError, PermissionError) as e:
                        print(f"Warning: Could not access {file_path}: {e}")
    
    except PermissionError as e:
        print(f"Error: Permission denied accessing {project_path}: {e}")
        return
    
    # Display results
    print(f"\n📊 PROJECT SIZE SUMMARY")
    print("=" * 60)
    print(f"Total Size: {format_size(total_size)}")
    print(f"Total Files: {file_count:,}")
    print(f"Total Directories: {dir_count:,}")
    
    # File type breakdown
    print(f"\n📁 BREAKDOWN BY FILE TYPE")
    print("=" * 60)
    sorted_types = sorted(file_type_stats.items(), key=lambda x: x[1]['size'], reverse=True)
    
    for ext, stats in sorted_types[:15]:  # Show top 15 file types
        percentage = (stats['size'] / total_size * 100) if total_size > 0 else 0
        print(f"{ext:<20} {format_size(stats['size']):<12} ({stats['count']:>6} files) {percentage:>6.1f}%")
    
    # Directory breakdown
    print(f"\n📂 BREAKDOWN BY DIRECTORY")
    print("=" * 60)
    sorted_dirs = sorted(directory_stats.items(), key=lambda x: x[1]['size'], reverse=True)
    
    for dir_name, stats in sorted_dirs[:20]:  # Show top 20 directories
        percentage = (stats['size'] / total_size * 100) if total_size > 0 else 0
        display_name = dir_name if len(dir_name) <= 40 else dir_name[:37] + "..."
        print(f"{display_name:<40} {format_size(stats['size']):<12} ({stats['count']:>6} files) {percentage:>6.1f}%")
    
    # Large files
    if large_files:
        print(f"\n🔍 LARGE FILES (>10MB)")
        print("=" * 60)
        large_files.sort(key=lambda x: x['size'], reverse=True)
        for file_info in large_files[:10]:  # Show top 10 large files
            print(f"{file_info['formatted_size']:<12} {file_info['path']}")
    
    # Additional insights
    print(f"\n💡 INSIGHTS")
    print("=" * 60)
    
    if total_size > 0:
        avg_file_size = total_size / file_count if file_count > 0 else 0
        print(f"Average file size: {format_size(avg_file_size)}")
        
        # Find biggest contributors
        if sorted_types:
            biggest_type = sorted_types[0]
            print(f"Largest file type: {biggest_type[0]} ({format_size(biggest_type[1]['size'])})")
        
        if sorted_dirs:
            biggest_dir = sorted_dirs[0]
            print(f"Largest directory: {biggest_dir[0]} ({format_size(biggest_dir[1]['size'])})")
    
    # Save detailed report to JSON
    report_data = {
        'summary': {
            'total_size_bytes': total_size,
            'total_size_formatted': format_size(total_size),
            'total_files': file_count,
            'total_directories': dir_count,
            'average_file_size_bytes': total_size / file_count if file_count > 0 else 0
        },
        'file_types': {ext: {'size_bytes': stats['size'], 'size_formatted': format_size(stats['size']), 'count': stats['count']} 
                     for ext, stats in sorted_types},
        'directories': {dir_name: {'size_bytes': stats['size'], 'size_formatted': format_size(stats['size']), 'count': stats['count']} 
                       for dir_name, stats in sorted_dirs},
        'large_files': large_files
    }
    
    report_file = project_path / 'project_size_report.json'
    try:
        with open(report_file, 'w') as f:
            json.dump(report_data, f, indent=2)
        print(f"\n📄 Detailed report saved to: {report_file}")
    except Exception as e:
        print(f"\nWarning: Could not save report file: {e}")

if __name__ == "__main__":
    # Use current directory if no argument provided
    project_path = sys.argv[1] if len(sys.argv) > 1 else "."
    analyze_project_size(project_path)