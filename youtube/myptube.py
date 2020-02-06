from pytube import YouTube
import argparse

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Youtube address')
    parser.add_argument('-y', '--yurl', help='Youtube url')
    parser.add_argument('-t', '--itag', help='itag')
    parser.add_argument('-c', '--caption', help='subtitle and caption')
    args = parser.parse_args()
    tube_address = args.yurl
    yt = YouTube(tube_address)
    # print(yt.title)
    for itag in yt.streams.filter(file_extension='mp4').all():
        print(itag)

    itag = args.itag
    if itag != '0':
        yt.streams.get_by_itag('22').download()

    for cp in yt.captions.all():
        print(cp)

    caption = args.caption
    if caption != '0':
        cp = yt.captions.get_by_language_code(caption)
        cp_str = cp.generate_srt_captions()
        with open('caption.txt', 'w') as f:
            f.write(cp_str)

