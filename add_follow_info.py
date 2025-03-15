
import csv
import os
import xml.etree.ElementTree as ET

def add_follow_info(csv_path = 'follow.csv' , rss_dir = 'rss_files'):
    follow_info = {}

    # 读取 follow.csv 文件
    with open(csv_path, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            follow_info[row['file']] = row['followInfo']
    
    # 遍历 rss_files 目录中的文件
    for rss_file in os.listdir(rss_dir):
        if rss_file in follow_info.keys():
            rss_path = os.path.join(rss_dir, rss_file)
            try:
                tree = ET.parse(rss_path)
                root = tree.getroot()

                # 找到 channel 的 description 标签并追加 followInfo
                for channel in root.findall('channel'):
                    description = channel.find('description')
                    if description is None:
                        description = ET.SubElement(channel, 'description')
                        description.text = follow_info[rss_file]
                    elif 'feedId' not in description.text:
                        description.text += '   ' + follow_info[rss_file]
            except Exception as e:
                print(f'解析 {rss_file} 时出错: {e}')
                continue


            print(f'已添加 followInfo 到 {rss_file}')
            
            # 保存修改后的 RSS 文件
            tree.write(rss_path, encoding='utf-8', xml_declaration=True)


if __name__ == '__main__':
    add_follow_info()