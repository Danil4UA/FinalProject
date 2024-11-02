
interface Props {
    toneOfVoice: string[];
    selectedTone: string;
    onSelectTone: (tone: string) => void;
}

const PostToneSelector = ({ toneOfVoice, selectedTone, onSelectTone }: Props): JSX.Element =>{
    return (
        <div className="tone-selector">
          <p className="tone-title">Tone of voice</p>
          <div className="tone-buttons-container">
            {toneOfVoice.map((tone) => (
              <button
                key={tone}
                className={`tone-button ${selectedTone === tone ? "selected" : ""}`}
                onClick={(event) => {
                    event.preventDefault(); 
                    onSelectTone(tone);
                }}
              >
                <span className={`tone-indicator ${selectedTone === tone ? "active" : ""}`}></span>
                {tone}
              </button>
            ))}
          </div>
        </div>
      );
} 

export default PostToneSelector;