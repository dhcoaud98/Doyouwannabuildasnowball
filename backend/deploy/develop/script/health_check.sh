#!/bin/bash
# (1)
url="http://localhost:8080/board/1"

timeout=5
online=false

echo "Checking status of $url."

# (2)
loopCount=1
while [ $loopCount -le 10 ]
do
  code=$(curl -sL --connect-timeout 20 --max-time 30 -w "%{http_code}\\n" "$url" -o /dev/null)
  echo "try $loopCount => code: $code"
  if [ "$code" = "200" ]; then
    online=true
    break
  else
    loopCount=$((loopCount + 1))
    sleep $timeout
  fi
done

# (3)
if $online; then
  echo "Monitor finished, website is online."
  exit 0 # Success
else
  echo "Monitor failed, website seems to be down."
  exit 1 # Failed
fi