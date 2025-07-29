import subprocess

def compress_mp4(input_file, output_file, crf=28, preset='medium'):
    cmd = [
        'ffmpeg',
        '-i', input_file,
        '-vcodec', 'libx264',
        '-crf', str(crf),
        '-preset', preset,
        '-acodec', 'aac',
        output_file
    ]
    subprocess.run(cmd, check=True)

# Example
compress_mp4('demo.mp4', 'output_compressed.mp4')
