﻿namespace Backend.Models;

public class GameState
{
    public GameMode GameMode { get; set; }
    public int Rounds { get; set; }
    public bool IsRunning { get; set; }
}