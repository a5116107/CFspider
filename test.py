import cfspider

res = cfspider.get(
    "https://httpbin.org/ip",
    cf_proxies="https://ip.kami666.xyz",
    uuid="c373c80c-58e4-4e64-8db5-40096905ec58",
)
print(res.text)