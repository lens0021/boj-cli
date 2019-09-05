#!/bin/bash
set -euo pipefail; IFS=$'\n\t'

./index programmers "$1" "$1"
