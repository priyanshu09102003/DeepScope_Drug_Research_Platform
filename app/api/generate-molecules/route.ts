import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.smi) {
      return NextResponse.json(
        { error: "SMILES string is required" },
        { status: 400 }
      );
    }
    
    const API_KEY = process.env.NVIDIA_API_KEY || "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";
    const invokeUrl = "https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate";
    
    console.log("Calling NVIDIA API with payload:", body);

    const response = await fetch(invokeUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("NVIDIA API Error:", errorText);
      return NextResponse.json(
        { error: `NVIDIA API Error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}