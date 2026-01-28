import re

# Read the file
with open('lib/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match specifications object with images/image inside
# This regex handles multi-line arrays and properties
pattern = r'(specifications: \{[^}]*?)(,?\s+images: \[[^\]]*?\],?)(,?\s+image: "[^"]*",?)(\s*\},)'

def replace_func(match):
    spec_start = match.group(1)
    images_part = match.group(2).strip()
    image_part = match.group(3).strip()
    spec_end = match.group(4)
    
    # Clean up the specifications closing
    spec_start_cleaned = spec_start.rstrip(', \n\t')
    
    # Ensure proper formatting
    if not images_part.startswith(','):
        images_part = '    ' + images_part.lstrip()
    else:
        images_part = '    ' + images_part.lstrip(',').lstrip()
        
    if not image_part.startswith(','):
        image_part = '    ' + image_part.lstrip()
    else:
        image_part = '    ' + image_part.lstrip(',').lstrip()
    
    # Return: close specifications, then add images/image at product level
    return f"{spec_start_cleaned}\n    }},\n{images_part}\n{image_part}\n    warranty:"

# First pass: move images/image that are inside specifications
new_content = re.sub(pattern, replace_func, content, flags=re.DOTALL)

# Second pattern: handle cases where only images is inside specs (no image property)
pattern2 = r'(specifications: \{[^}]*?)(,?\s+images: \[[^\]]*?\],?)(\s*\},\s*warranty:)'

def replace_func2(match):
    spec_start = match.group(1)
    images_part = match.group(2).strip()
    spec_end_and_warranty = match.group(3)
    
    # Clean up
    spec_start_cleaned = spec_start.rstrip(', \n\t')
    if not images_part.startswith(','):
        images_part = '    ' + images_part.lstrip()
    else:
        images_part = '    ' + images_part.lstrip(',').lstrip()
    
    return f"{spec_start_cleaned}\n    }},\n{images_part}\n    warranty:"

new_content = re.sub(pattern2, replace_func2, new_content, flags=re.DOTALL)

# Write back
with open('lib/products.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Fixed all images/image properties!')
print('Moved them from specifications object to product level.')
