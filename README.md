# Baekjoon Online Judge용 커맨드라인 인터페이스

```shell
$ ./index -n 1000
Your answer is good for in/output samples
```

## 사용법

다음 명령 실행시 문제를 가져오거나 채점합니다. (site_tag는 아래 나열된 목록 중 하나, problem_number는 문제 번호 숫자)

```shell
./index boj -s [site_tag] -l [language_code] -n [problem_number]
```

어떤 문제에 대해 처음으로 커맨드를 실행했다면, 프로그램은 해당 문제의 입력 및 출력 예제를 가져와 저장하고 문제 링크를 최상단에 주석으로 위치시킨 빈 파일을 생성하고 이를 VS코드로 엽니다.

이후 실행시에는 `[problem_number].[language_code]`에 예제 입력을 사용하여 실행한 후 예제 출력과 비교합니다.

### 사용 가능 사이트

| 태그  | 사이트                | 주소                                                  |
| ----- | --------------------- | ----------------------------------------------------- |
| `boj` | Baekjoon Online Judge | https://www.acmicpc.net/problem/$1                    |
| `prg` | Programmers           | https://programmers.co.kr/learn/courses/30/lessons/$1 |

### 사용 가능 언어

| 태그 | 언어    |
| ---- | ------- |
| `py` | Python3 |
| `js` | Node.js |

### 주의사항

- 이 프로그램은 매우 [@lens0021]를 위하여 작성되어 있어 다른 용도의 사용에는 불편함이 있습니다. 포크하여 수정하기도 불편할 것으로 예상되는 바, 필요한 경우에는 코드를 참고하여 새 프로그램을 만드는 것을 권하여 드립니다.
- 제출 기능은 없습니다.

## 의존성

- [Yq]
- Node(for fetching in/output samples)
- Visual Studio Code(as just a text editor)
- git(for diff engine)
- curl

## 설치 방법

(아래 설명은 우분투에 한정함)

```shell
sudo snap install yq
npm install
cp settings.sample.yaml settings.yaml
```

[baekjoon online judge]: https://www.acmicpc.net/
[@lens0021]: https://github.com/lens0021
[yq]: https://mikefarah.github.io/yq/
