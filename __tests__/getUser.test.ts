import { GET } from "@/app/api/getUser/route";
import { NextRequest } from "next/server";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        users: [
          {
            firstName: "Khamonluck",
            lastName: "Angkananon",
            gender: "female",
            age: 31,
            hair: { color: "Black" },
            address: { postalCode: "10310" },
            company: { department: "Developer" },
          },
          {
            firstName: "Moonjung",
            lastName: "Themoon",
            gender: "male",
            age: 20,
            hair: { color: "Black" },
            address: { postalCode: "14323" },
            company: { department: "Developer" },
          },
          {
            firstName: "John",
            lastName: "Smith",
            gender: "male",
            age: 25,
            hair: { color: "Brown" },
            address: { postalCode: "83000" },
            company: { department: "Marketing" },
          },
          {
            firstName: "Luna",
            lastName: "Themoon",
            gender: "female",
            age: 40,
            hair: { color: "White" },
            address: { postalCode: "80210" },
            company: { department: "Marketing" },
          },
        ],
      }),
  })
) as jest.Mock;

describe("GET /api/getUser", () => {
  it("should group users by department and return summary", async () => {
    const res = await GET({} as NextRequest);
    const json = await res.json();

    expect(json).toHaveProperty("Developer");
    expect(json).toHaveProperty("Marketing");

    expect(json.Developer.male).toBe(1);
    expect(json.Developer.female).toBe(1);
    expect(json.Marketing.male).toBe(1);
    expect(json.Marketing.female).toBe(1);

    expect(json.Developer.ageRange).toBe("20-31");
    expect(json.Marketing.ageRange).toBe("25-40");

    expect(json.Developer.hair).toEqual({
        Black: 2,
      });
    expect(json.Marketing.hair).toEqual({
      Brown: 1,
      White: 1,
    });

    expect(json.Developer.addressUser).toHaveProperty("KhamonluckAngkananon", "10310");
    expect(json.Developer.addressUser).toHaveProperty("MoonjungThemoon", "14323");
    expect(json.Marketing.addressUser).toHaveProperty("JohnSmith", "83000");
    expect(json.Marketing.addressUser).toHaveProperty("LunaThemoon", "80210");
  });
});
