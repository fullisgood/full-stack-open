```mermaid
sequenceDiagram
    participant b as browser
    participant s as server
    b->>+s: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    note right of s: Save new note<br/>Return 302 redirect to /notes
    s-->>-b: HTTP Status 302 to /notes
    b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    s-->>b: HTML-code
    b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    s-->>b: main.css
    b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    s-->>b: main.js
    note left of b: browser execute js-code<br/>request json data
    b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    s-->>b: json data
    note left of b: browser execute the event handler<br/>display notes
```