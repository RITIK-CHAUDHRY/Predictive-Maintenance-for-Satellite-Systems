import { useState } from 'react';
import { Upload, Brain, AlertTriangle, CheckCircle, FileInput, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PredictionResult {
  componentHealth: number;
  failureProbability: number;
  timeToFailure: number;
  criticalComponents: Array<{
    name: string;
    health: number;
    risk: string;
  }>;
  recommendations: string[];
}

const PredictionSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPrediction(null);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a telemetry data file to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result: PredictionResult = await response.json();
      setPrediction(result);
      
      toast({
        title: "Analysis Complete",
        description: "Satellite component analysis has been completed successfully.",
      });
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze satellite data');
      
      toast({
        title: "Analysis Failed",
        description: "Unable to process the telemetry data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-500/10 border-green-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'high': return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <section id="prediction" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Satellite Failure Prediction Engine
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Upload your satellite telemetry data and receive instant AI-powered predictions 
            about component health, failure probability, and maintenance recommendations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect border-blue-500/30 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <FileInput className="w-6 h-6 text-blue-400" />
                <span>Upload Telemetry Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="telemetry-file" className="text-gray-300">
                    Select telemetry data file (CSV)
                  </Label>
                  <div className="relative">
                    <Input
                      id="telemetry-file"
                      type="file"
                      accept=".csv,.json,.xml"
                      onChange={handleFileChange}
                      className="bg-blue-950/30 border-blue-500/30 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:mr-4 file:px-4 file:py-2"
                    />
                    {file && (
                      <div className="mt-2 flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!file || isAnalyzing}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing Telemetry Data...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>Analyze Satellite Components</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {prediction && (
            <div className="space-y-6 animate-fade-in">
              <Card className="glass-effect border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Brain className="w-6 h-6 text-blue-400" />
                    <span>Prediction Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {prediction.componentHealth.toFixed(1)}%
                      </div>
                      <div className="text-gray-300 font-medium">Overall Health</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">
                        {prediction.failureProbability.toFixed(1)}%
                      </div>
                      <div className="text-gray-300 font-medium">Failure Risk</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {prediction.timeToFailure}
                      </div>
                      <div className="text-gray-300 font-medium">Days Remaining</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    <span>Component Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prediction.criticalComponents.map((component, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${getRiskBgColor(component.risk)}`}>
                        <div>
                          <div className="font-semibold text-white">{component.name}</div>
                          <div className="text-sm text-gray-300">Health: {component.health}%</div>
                        </div>
                        <div className={`flex items-center space-x-2 ${getRiskColor(component.risk)}`}>
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-semibold">{component.risk} Risk</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>AI Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {prediction.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PredictionSection;
