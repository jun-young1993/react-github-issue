import {useState} from "react";
interface UseGithubMarkdownPreviewProps {
    gitPersonalAccessToken?: string;
    content?: string
}
const useGithubMarkdownPreview = ({
                                             gitPersonalAccessToken,
                                             content
                                         }: UseGithubMarkdownPreviewProps) => {
    const [text, setText] = useState<string>('');

    if(content && gitPersonalAccessToken && content !== ''){

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
    }else{
        return {text: null, setText};
    }

    return {text,setText};
}
export default useGithubMarkdownPreview;