local RisingPunch, FallingPunch, StraightPunch

local keys = {}
local zCombos = {}
local xCombos = {}
local cCombos = {}

local Combos = {zCombos, xCombos, cCombos}

local zCombo1 = {}
local zCombo1Keys = {
    0,
    1,
    2
}
local zCombo1Anims = {
    RisingPunch,
    FallingPunch,
    StraightPunch
}
table.insert(zCombo1, zCombo1Keys)
table.insert(zCombo1, zCombo1Anims)


local zCombo2 = {}
local zCombo2Keys = {
    0,
    2,
    1,
    2
}
local zCombo2Anims = {
    RisingPunch,
    StraightPunch,
    FallingPunch,
    StraightPunch
}

table.insert(zCombo2, zCombo2Keys)
table.insert(zCombo2, zCombo2Anims)

table.insert(zCombos, zCombo1)
table.insert(zCombos, zCombo2)

function recursiveTableCheck(tab)
    --Insert some sort of check toward keys here
    for i, v in pairs(tab) do
        local Type = type(v)
        if Type ~= type(table) and Type == "number" then
            print(v)
        else
            recursiveTableCheck(v)
        end
    end
end