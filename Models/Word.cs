struct Word
{
    public Word(string simplified, string traditional, string sounds, string pinyin, string definition)
    {
        Simplified = simplified;
        Traditional = traditional;
        Sounds = sounds;
        Pinyin = pinyin;
        Definition = definition;
    }

    public string Simplified { get; set; }
    public string Traditional { get; set; }
    public string Sounds { get; set; }
    public string Pinyin { get; set; }
    public string Definition { get; set; }
}
