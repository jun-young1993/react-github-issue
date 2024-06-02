import {useState} from "react";
interface UseGithubMarkdownPreviewProps {
    gitPersonalAccessToken?: string;
    content?: string
    request?: boolean
}
const useGithubMarkdownPreview = ({
                                             gitPersonalAccessToken,
                                             content,
                                            request=true
                                         }: UseGithubMarkdownPreviewProps) => {
    const [text, setText] = useState<string>('');
    const [requestText, setRequestText] = useState<string | undefined>(content);

    if(content && gitPersonalAccessToken && content !== '' && request && (content !== requestText)){
        setRequestText(content);
        fetch('https://api.github.com/markdown',{
            method: 'POST',
            headers: {
                'Accept' : "application/vnd.github+json",
                'X-GitHub-Api-Version': "2022-11-28",
                'Authorization': `Bearer ${gitPersonalAccessToken}`
            },
            body: JSON.stringify({
                text: content
            })
        })
            .then(response => {
                if(response.status !== 200){
                    throw new Error(`[Github API Exception] ${response.status} ${response.statusText}`)
                }
                return response.text();
            })
            .then((result) => {

                setText(result);
            })
            .catch(error => {
                throw new Error(error.toString()+`
			    	https://api.github.com/markdown
			`);
            });
    }

    return {text,setText};
}
export default useGithubMarkdownPreview;