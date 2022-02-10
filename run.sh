#!/bin/bash
cd /app

serve -s build &

npm run server-start
